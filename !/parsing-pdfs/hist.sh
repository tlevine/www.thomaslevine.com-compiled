#!/usr/bin/env python2

import sys
import os
import locale
locale.setlocale(locale.LC_ALL, '')

# Read params
if len(sys.argv) > 1:
	step = locale.atof(sys.argv[1])
else:
	step = 1

complete = False

# Read values
freq = dict()
if 'COLUMNS' in os.environ:
	width = int(os.environ['COLUMNS'])
else:
	width = 80
total = 0

for line in sys.stdin:
	if len(line.strip()) > 0:
		try: 
			items = line.strip().split()
			val = int(locale.atof(items[0]) / step)

			if len(items) > 1:
				count = locale.atof(items[1])
			else:
				count = 1

			if count == 0:
				continue

			if val in freq:
				freq[val] += count
			else:
				freq[val] = count
			total += 1
		except:
			continue

# Print histogram
if freq.values() != []:
        max = max(freq.values())
else:
        sys.exit(1)

if complete:
	for c in range(min(freq.keys()), max(freq.keys()), step):
		if c in freq:
		    f = freq[c]
		else:
		    f = 0
		N = int( f  * width / max )
		print "% 6f | %6d | %s\n" % (c * step, f, ''.join('*' for X in range(N))),
else:
	for c in sorted(freq.keys()):
		f = freq[c]
		N = int( f  * width / max )
		print "% 6f | %6d | %s\n" % (c * step, f, ''.join('*' for X in range(N))),

print "TOTAL     | %6d |\n" % total
