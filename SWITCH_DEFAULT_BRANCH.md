# Switching Default Branch to Main

This document provides instructions for changing the repository's default branch from `V0-Pitching-Page` to `main`.

## Background

The repository currently has `V0-Pitching-Page` set as the default branch. This needs to be changed to `main` to follow standard Git conventions and improve repository organization.

## Current State

- **Current Default Branch**: `V0-Pitching-Page`
- **Target Default Branch**: `main`
- **Existing Branches**:
  - `V0-Pitching-Page` (current default)
  - `main` (target default)
  - `copilot/switch-default-branch-to-main` (working branch)

## Steps to Change Default Branch

### Option 1: Via GitHub Web Interface (Recommended)

1. **Navigate to Repository Settings**
   - Go to https://github.com/HPABio/SBR2026
   - Click on **Settings** tab (requires admin access)

2. **Access Branches Settings**
   - In the left sidebar, click on **Branches**
   - Look for the "Default branch" section

3. **Change Default Branch**
   - Click the switch/edit button (⇄ or pencil icon) next to the current default branch
   - Select `main` from the dropdown menu
   - Click **Update** or **I understand, update the default branch**

4. **Confirm the Change**
   - GitHub will show a warning about potential impacts
   - Review the warning and confirm the change

### Option 2: Via GitHub CLI (gh)

If you have the GitHub CLI installed and authenticated:

```bash
gh repo edit HPABio/SBR2026 --default-branch main
```

### Option 3: Via GitHub API

Using curl or another HTTP client:

```bash
curl -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/HPABio/SBR2026 \
  -d '{"default_branch":"main"}'
```

## Important Considerations

### Before Making the Change

1. **Ensure `main` branch is up-to-date**: Verify that the `main` branch contains all necessary code and is in a deployable state.

2. **Check Protected Branch Rules**: Review any branch protection rules on `V0-Pitching-Page` and consider applying them to `main`.

3. **Update CI/CD Configurations**: If you have any CI/CD pipelines that explicitly reference `V0-Pitching-Page`, update them to use `main`.

### After Making the Change

1. **Update Local Clones**: Team members will need to update their local repositories:
   ```bash
   git fetch origin
   git checkout main
   git branch --set-upstream-to=origin/main main
   ```

2. **Update Clone URLs**: New clones will automatically use `main` as the default branch.

3. **Consider Deprecating Old Branch**: After verifying everything works, you may want to:
   - Add a README to `V0-Pitching-Page` noting it's deprecated
   - Or delete it if no longer needed (after backing up if necessary)

4. **Update Documentation**: Update any external documentation that references the repository structure.

## Verification

After changing the default branch, verify the change:

1. **Via Git Command**:
   ```bash
   git ls-remote --symref origin HEAD
   # Should show: ref: refs/heads/main	HEAD
   ```

2. **Via GitHub Web Interface**:
   - Visit the repository homepage
   - The default branch should now show as `main`
   - New pull requests should target `main` by default

## Rollback

If you need to revert the change, follow the same steps but select `V0-Pitching-Page` instead of `main`.

## Questions or Issues?

If you encounter any problems during this process, please:
1. Check GitHub's documentation: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch
2. Open an issue in this repository
3. Contact the repository administrators

---

**Note**: Changing the default branch requires repository admin permissions. If you don't have these permissions, please contact a repository administrator.
