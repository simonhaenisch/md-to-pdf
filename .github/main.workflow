workflow "Main" {
  on = "push"
  resolves = ["Lint"]
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "Lint" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  args = "run lint"
}
