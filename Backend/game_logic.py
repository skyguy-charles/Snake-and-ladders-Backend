import random


BOARD_END = 100


# Default snakes and ladders layout (example)
DEFAULT_SNAKES = {
16: 6,
46: 25,
49: 11,
62: 19,
64: 60,
74: 53,
89: 68,
92: 88,
95: 75,
99: 80,
}


DEFAULT_LADDERS = {
2: 38,
7: 14,
8: 31,
15: 26,
21: 42,
28: 84,
36: 44,
51: 67,
71: 91,
78: 98,
87: 94,
}




def roll_dice(sides=6):
 return random.randint(1, sides)




def apply_snakes_ladders(pos, snakes, ladders):
 # snakes and ladders are dicts mapping start->end
 if pos in ladders:
  return ladders[pos], "ladder"
 if pos in snakes:
  return snakes[pos], "snake"
 return pos, None