# Contributing

We welcome contributions! To keep the codebase clean and maintainable, please follow the conventions below.

---

## ✅ Semantic Commit Messages

Use the following format for your commits:

**Format:**  
`<type>(<scope>): <subject>`

- `<scope>` is optional.
- Use present tense and be concise.

### 🧪 Example

```text
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, test, etc.
```

---

## 🧾 Commit Types

| Type       | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| `feat`     | A new feature for the user                                               |
| `fix`      | A bug fix                                                                |
| `docs`     | Changes to documentation only                                            |
| `style`    | Code style changes (formatting, whitespace, etc.) — no functional change |
| `refactor` | Code refactoring without changing behavior or fixing a bug               |
| `test`     | Adding or refactoring tests — no production code changes                 |
| `chore`    | Maintenance tasks (e.g., build config, package updates)                  |
| `ci`       | Changes to CI configuration or scripts (GitHub Actions, GitLab, etc.)    |
| `revert`   | Reverts a previous commit                                                |
| `perf`     | Performance improvements                                                 |

---

## 🔗 References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Sparkbox: Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Karma Commit Guidelines](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)
