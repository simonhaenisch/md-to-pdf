workflow "Main" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "Test" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  args = "test"
}
