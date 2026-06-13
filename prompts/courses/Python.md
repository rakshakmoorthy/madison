# Python.md

## Purpose

This file defines the Python conventions for all infographic and data visualization code produced by Humanitarians Courses. Code must be **clean, readable, course-ready, and runnable** with minimal setup.

---

## Libraries

### Primary (always available)

- `pandas` — all tabular data manipulation.
- `matplotlib` — all chart rendering.
- `matplotlib.pyplot` as `plt` — standard alias; never vary this.

### Conditionally Permitted

- `seaborn` — permitted only for statistical plots (heatmaps, distribution plots) where matplotlib alone is cumbersome. Always import as `import seaborn as sns`. If seaborn is used, note it explicitly in a comment.
- `numpy` — permitted for calculations only (e.g., computing means, generating ranges). Import as `import numpy as np`.

### Explicitly Banned

- `plotly` — interactive charts are not the target output; avoid unless the user specifically requests interactive HTML export.
- `bokeh`, `altair`, `dash` — not used unless explicitly requested.
- Any library requiring a paid API key or external service call.

---

## Code Style

### Import Pattern

Always use this exact import block at the top, including only what is used:

```python
import pandas as pd
import matplotlib.pyplot as plt
# import numpy as np  # include only if needed
# import seaborn as sns  # include only if needed; note why
```

### Data Structure

- Always use a `pd.DataFrame` for chart data, not raw Python lists or dicts passed directly to matplotlib.
- Use named columns that match axis labels and chart titles.
- Placeholder data should be clearly labeled as such in a comment.

```python
# Placeholder data — replace with real dataset
data = pd.DataFrame({
    'Category': ['Group A', 'Group B', 'Group C'],
    'Value': [42, 67, 55]
})
```

### Mandatory Chart Elements

Every chart must include:

1. **Title** — set with `ax.set_title(...)` or `plt.title(...)`.
2. **Axis labels** — both x and y axes labeled with `ax.set_xlabel(...)` and `ax.set_ylabel(...)`.
3. **`plt.tight_layout()`** — always called before `plt.show()` or `plt.savefig()`.
4. **`plt.show()`** — at the end of every standalone script.

Never omit axis labels. A chart without axis labels is incomplete.

### File Paths

- No hard-coded absolute file paths (e.g., no `/Users/nik/Desktop/data.csv`).
- Use relative paths or parameterized variables:

```python
DATA_PATH = 'data/my_dataset.csv'  # set at the top of the script
df = pd.read_csv(DATA_PATH)
```

### Code Comments

Structure comments in three layers:

1. **Section header** (what this block does): `# --- Load Data ---`
2. **Inline intent** (why a choice was made): `# Sort descending so largest bar is on top`
3. **Placeholder flags**: `# TODO: replace with real data` or `# Placeholder`

Do not comment obvious syntax (`# create a figure` above `fig, ax = plt.subplots()`).

---

## Templates

### Generic Bar Chart (Vertical)

```python
import pandas as pd
import matplotlib.pyplot as plt

# --- Placeholder Data ---
data = pd.DataFrame({
    'Category': ['A', 'B', 'C', 'D'],
    'Value': [23, 45, 31, 52]
})

# --- Plot ---
fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(data['Category'], data['Value'], color='steelblue', edgecolor='white')

# --- Labels ---
ax.set_title('Main Finding Goes Here', fontsize=14, fontweight='bold')
ax.set_xlabel('Category Label', fontsize=11)
ax.set_ylabel('Value Label (units)', fontsize=11)

# --- Direct value labels on bars ---
for i, v in enumerate(data['Value']):
    ax.text(i, v + 0.5, str(v), ha='center', fontsize=10)

ax.spines[['top', 'right']].set_visible(False)  # reduce extraneous ink
plt.tight_layout()
plt.show()
```

### Generic Line Chart

```python
import pandas as pd
import matplotlib.pyplot as plt

# --- Placeholder Data ---
data = pd.DataFrame({
    'Year': [2019, 2020, 2021, 2022, 2023],
    'Value': [30, 45, 40, 60, 75]
})

# --- Plot ---
fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(data['Year'], data['Value'], marker='o', color='steelblue', linewidth=2)

# --- Labels ---
ax.set_title('Trend Over Time', fontsize=14, fontweight='bold')
ax.set_xlabel('Year', fontsize=11)
ax.set_ylabel('Value Label (units)', fontsize=11)

ax.spines[['top', 'right']].set_visible(False)
plt.tight_layout()
plt.show()
```

### Generic Stacked Bar Chart

```python
import pandas as pd
import matplotlib.pyplot as plt

# --- Placeholder Data ---
data = pd.DataFrame({
    'Group': ['Group A', 'Group B', 'Group C'],
    'Part 1': [20, 35, 15],
    'Part 2': [30, 20, 40],
    'Part 3': [10, 15, 25]
})

# --- Plot ---
fig, ax = plt.subplots(figsize=(7, 4))
colors = ['steelblue', 'darkorange', 'seagreen']
bottom = [0] * len(data)
for i, col in enumerate(['Part 1', 'Part 2', 'Part 3']):
    ax.bar(data['Group'], data[col], bottom=bottom, label=col, color=colors[i])
    bottom = [b + v for b, v in zip(bottom, data[col])]

# --- Labels ---
ax.set_title('Part-to-Whole Comparison by Group', fontsize=14, fontweight='bold')
ax.set_xlabel('Group', fontsize=11)
ax.set_ylabel('Total Value (units)', fontsize=11)
ax.legend(loc='upper right', frameon=False)

ax.spines[['top', 'right']].set_visible(False)
plt.tight_layout()
plt.show()
```

### Horizontal Bar Chart (for ranked categories)

```python
import pandas as pd
import matplotlib.pyplot as plt

# --- Placeholder Data (sorted descending) ---
data = pd.DataFrame({
    'Category': ['Item E', 'Item C', 'Item A', 'Item D', 'Item B'],
    'Value': [72, 65, 58, 44, 31]
})

# --- Plot ---
fig, ax = plt.subplots(figsize=(7, 4))
ax.barh(data['Category'], data['Value'], color='steelblue', edgecolor='white')

# --- Direct value labels ---
for i, v in enumerate(data['Value']):
    ax.text(v + 0.5, i, str(v), va='center', fontsize=10)

# --- Labels ---
ax.set_title('Ranked Comparison', fontsize=14, fontweight='bold')
ax.set_xlabel('Value Label (units)', fontsize=11)
ax.set_ylabel('')  # category labels are self-explanatory on y-axis

ax.spines[['top', 'right']].set_visible(False)
plt.tight_layout()
plt.show()
```
