export interface GitRecipe {
  title: string;
  category: 'Commits' | 'Branches' | 'Stash' | 'Undoing' | 'Remote';
  command: string;
  description: string;
}

export const GIT_RECIPES: GitRecipe[] = [
  { title: 'Undo Last Commit (Keep Changes)', category: 'Undoing', command: 'git reset --soft HEAD~1', description: 'Removes the last commit while leaving your staged files untouched in your working directory.' },
  { title: 'Discard Last Commit (Permanent)', category: 'Undoing', command: 'git reset --hard HEAD~1', description: 'Completely nukes the last commit and all changes associated with it.' },
  { title: 'Amend Last Commit Message', category: 'Commits', command: 'git commit --amend -m "new commit message"', description: 'Replaces the message of the most recent commit without creating a new commit.' },
  { title: 'Stage and Amend without Changing Message', category: 'Commits', command: 'git commit --amend --no-edit', description: 'Adds newly staged files to the previous commit while keeping the exact same commit log.' },
  { title: 'Stash Working Changes with Name', category: 'Stash', command: 'git stash push -m "work in progress"', description: 'Shelves your current uncommitted changes with an identifiable label.' },
  { title: 'Pop Stash Changes', category: 'Stash', command: 'git stash pop', description: 'Applies the latest stashed changes back onto your working branch and removes it from stash list.' },
  { title: 'Revert Commit Safely', category: 'Undoing', command: 'git revert <commit_hash>', description: 'Creates a brand new commit that inverts the changes of a previous commit, safe for shared branches.' },
  { title: 'Rename Current Local Branch', category: 'Branches', command: 'git branch -m <new_name>', description: 'Renames the branch you currently have checked out.' },
  { title: 'Delete Local and Remote Branch', category: 'Branches', command: 'git branch -d <branch_name>; git push origin --delete <branch_name>', description: 'Deletes branch locally and removes tracking branch from origin.' },
  { title: 'Interactive Rebase Last N Commits', category: 'Commits', command: 'git rebase -i HEAD~<count>', description: 'Opens interactive editor to squash, fixup, reword, or reorder the last N commits.' },
  { title: 'Safe Force Push', category: 'Remote', command: 'git push --force-with-lease origin <branch>', description: 'Safely force pushes only if no one else has updated the remote branch in the meantime.' },
  { title: 'Remove Untracked Files and Folders', category: 'Undoing', command: 'git clean -fd', description: 'Deletes all untracked files and directories not listed in .gitignore.' },
  { title: 'Cherry-Pick Commit into Current Branch', category: 'Commits', command: 'git cherry-pick <commit_hash>', description: 'Applies an individual commit from another branch onto your active branch.' }
];

export function filterGitRecipes(query: string, category?: string): GitRecipe[] {
  const q = query.toLowerCase().trim();
  return GIT_RECIPES.filter(r => {
    const matchesCat = !category || category === 'All' || r.category === category;
    const matchesQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.command.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });
}
