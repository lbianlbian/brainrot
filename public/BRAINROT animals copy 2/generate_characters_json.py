#!/usr/bin/env python3
"""
Generate a JSON file of characters by combining names, descriptions, and image filenames.
"""
import os
import re
import json

def rtf_to_text(rtf):
    """
    Convert RTF content to plain text by stripping control words and decoding hex escapes.
    """
    def rep_hex(match):
        code = match.group(1)
        return bytes([int(code, 16)]).decode('cp1252')
    # Decode hex escapes like \'e0
    text = re.sub(r"\\'([0-9A-Fa-f]{2})", rep_hex, rtf)
    # Remove RTF control words (e.g., \pard, \f0) and following optional space
    text = re.sub(r"\\[a-zA-Z]+\d* ?", "", text)
    # Remove any residual backslash escapes
    text = re.sub(r"\\[^a-zA-Z0-9']", "", text)
    # Remove braces
    text = text.replace('{', '\n').replace('}', '')
    return text

def parse_names(names_file):
    raw = open(names_file, 'r', encoding='latin1').read()
    parsed = rtf_to_text(raw)
    # Extract the list starting from '1.'
    start_idx = parsed.find('1.')
    sub = parsed[start_idx:] if start_idx != -1 else parsed
    # Find positions of each numbered entry
    positions = {}
    for n in range(1, 66):
        # Try matching 'n.' first, else match standalone 'n'
        m = re.search(rf'(?<!\d){n}\.', sub)
        if m:
            positions[n] = m.start()
        else:
            m2 = re.search(rf'(?<!\d){n}(?!\d)', sub)
            if m2:
                positions[n] = m2.start()
            else:
                raise ValueError(f"No match for name index {n}")
    # Slice out each name by position
    names = {}
    sorted_nums = sorted(positions, key=positions.get)
    for i, n in enumerate(sorted_nums):
        start = positions[n]
        end = positions[sorted_nums[i+1]] if i+1 < len(sorted_nums) else len(sub)
        segment = sub[start:end]
        # Remove leading 'n.' or 'n'
        name = re.sub(rf'^{n}\.?', '', segment).strip()
        names[n] = name
    return names

def parse_description(desc_file):
    raw = open(desc_file, 'r', encoding='latin1').read()
    parsed = rtf_to_text(raw)
    # Collect non-empty lines
    lines = [line.strip() for line in parsed.splitlines() if line.strip()]
    if not lines:
        return ""
    # Return the longest line as the description
    return max(lines, key=len)

def find_picture(n):
    # Look for common image extensions
    for ext in ('.webp', '.jpg', '.png'):
        fname = f"{n}{ext}"
        if os.path.isfile(fname):
            return fname
    raise FileNotFoundError(f"No picture file found for index {n}")

def main():
    names_file = 'Names-in-order.rtf'
    if not os.path.isfile(names_file):
        raise FileNotFoundError(f"Names file not found: {names_file}")
    names = parse_names(names_file)
    characters = []
    for n in sorted(names):
        # Determine description file (.rtf or .rtfd)
        desc_rtf = f"{n}.rtf"
        desc_rtfd = f"{n}.rtfd"
        if os.path.isfile(desc_rtf):
            desc_file = desc_rtf
        elif os.path.isdir(desc_rtfd):
            # Handle RTFD directory by finding an RTF file inside
            inner = [f for f in os.listdir(desc_rtfd) if f.lower().endswith('.rtf')]
            if inner:
                desc_file = os.path.join(desc_rtfd, inner[0])
            else:
                raise FileNotFoundError(f"No RTF file inside directory {desc_rtfd}")
        else:
            raise FileNotFoundError(f"No description file for index {n}")
        description = parse_description(desc_file)
        picture = find_picture(n)
        characters.append({
            'name': names[n],
            'description': description,
            'picture': picture,
        })
    # Write output JSON
    with open('characters.json', 'w', encoding='utf-8') as out:
        json.dump(characters, out, ensure_ascii=False, indent=2)
    print(f"Generated characters.json with {len(characters)} entries")

if __name__ == '__main__':
    main()