# GitHub Actions Job Summary

It is GitHub Actions to generate GitHub Actions Job Summary with Markdown file.

## Usage

```yaml
- uses: x-color/github-actions-job-summary@v1
  with:
    file: <file path>
    vars: |
      <variables>
```

| name | description                                  | required |
| ---- | -------------------------------------------- | -------- |
| file | It is a markdown file path                   | true     |
| vars | The action fills the variables into the file | false    |

## Sample

When you use these files

.github/workflows/main.yaml

```yaml
on:
  push:
      - main

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: time
        id: time
        run: |
          time=$(date)
          echo "::set-output name=time::$time"
      - uses: ./
        with:
          file: .github/workflows/summary.md
          vars: |
            message: sample text
            count: 3
            time: ${{ steps.time.outputs.time }}

```

.github/workflows/summary.md

```md
# Sample

'{message}' is embedded text.
Count is {count}.
Generated at {time}.
```

The action generates the following summary.

```md
# Sample

'sample text' is embedded text.
Count is 3.
Generated at Sun Jul 31 00:00:00 UTC 2022..
```
