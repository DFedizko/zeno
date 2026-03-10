---
name: commit
description: Create git commits following the project's conventional commits convention. Use when the user asks to commit changes.
---

# Commit

Follow these rules strictly when creating commits for this project:

## Rules

- **Language**: commit messages must always be in **English**
- **Format**: conventional commits — `type(optional-scope): short description`
- **Subject only**: no body, no description, no footer
- **No co-authorship**: never add `Co-Authored-By` or any trailer
- **Group by context**: when multiple files are changed, split into multiple commits grouping related changes together (e.g. service + action in one commit, component refactor in another, feature flag changes in another)
- **Specific files**: always stage specific files by name, never use `git add .` or `git add -A`

## Types

- `feat` — new feature or behavior
- `fix` — bug fix
- `refactor` — code change that neither fixes a bug nor adds a feature
- `chore` — tooling, config, dependencies
- `docs` — documentation only

## Examples (from this project)

```
feat: add patch monthly income service method and action
refactor(MonthlyIncomeFormWrapper): use put action to update monthly income
feat: remove partner check from gift-ab-test flag keeping only celular product
fix: change gift-ab-test variant from control to b
feat: create ab test to remove discount progress bar
fix(CreditSelectorRoot): using alias import for useIsHydrated hook
```

## Steps

1. Run `git status` and `git diff --stat` to understand what changed
2. Run `git log --oneline -5` to confirm style from recent commits
3. Group changed files by context and create one commit per group
4. Stage only the relevant files for each commit, then commit
5. Never commit files unrelated to the current task (e.g. files from other branches)
