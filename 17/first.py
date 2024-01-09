from heapq import heappush, heappop

import os

# Get the absolute path to the directory containing the script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the test.txt file
file_path = os.path.join(script_dir, 'test.txt')

# Open the file using the absolute path
with open(file_path) as file:
    grid = [list(map(int, line.strip())) for line in file]
#print(grid)
seen = set()
pq = [(0, 0, 0, 0, 0, 0)]

while pq:
    hl, r, c, dr, dc, n = heappop(pq)
    #print(hl,r,c,dr,dc,n)
    if r == len(grid) - 1 and c == len(grid[0]) - 1:
        print(hl)
        break

    if (r, c, dr, dc, n) in seen:
        continue

    seen.add((r, c, dr, dc, n))
    # print(seen)
    if n < 3 and (dr, dc) != (0, 0):
        nr = r + dr
        nc = c + dc
        if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]):
            heappush(pq, (hl + grid[nr][nc], nr, nc, dr, dc, n + 1))

    for ndr, ndc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
        if (ndr, ndc) != (dr, dc) and (ndr, ndc) != (-dr, -dc):
            nr = r + ndr
            nc = c + ndc
            if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]):
                heappush(pq, (hl + grid[nr][nc], nr, nc, ndr, ndc, 1))