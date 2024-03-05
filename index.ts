import readline from "readline";
import { existsSync } from "fs";
import {
  cloneProjects,
  createFolder,
  deleteFolder,
  resyncProject,
} from "./src/tools/syncUtils";
import { getDesktopDir } from "./src/tools/syncScript";
import { projectNameList } from "./src/data/project";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const desktopDir = getDesktopDir();
  const githubSyncDir = `${desktopDir}/GithubSync`;

  let deleteSyncGithubDir = false;

  if (existsSync(githubSyncDir)) {
    rl.question(
      "Le dossier GithubSync existe déjà. Voulez-vous le supprimer et le recréer ? (oui/non) ",
      (answer) => {
        if (answer.toLowerCase() === "oui") {
          deleteSyncGithubDir = true;
        }
        rl.question(
          "Veuillez saisir votre nom d'utilisateur GitHub : ",
          (username) => {
            if (deleteSyncGithubDir) {
              deleteFolder(githubSyncDir);
            }
            createFolder(githubSyncDir);
            cloneProjects(projectNameList, githubSyncDir, username);
            rl.close();
          }
        );
      }
    );
  } else {
    rl.question(
      "Veuillez saisir votre nom d'utilisateur GitHub : ",
      (username) => {
        createFolder(githubSyncDir);
        cloneProjects(projectNameList, githubSyncDir, username);
        rl.close();
      }
    );
  }

  rl.on("close", () => {
    if (!deleteSyncGithubDir) {
      rl.question(
        "Voulez-vous resynchroniser un projet existant dans GithubSync ? (oui/non) ",
        (answer) => {
          if (answer.toLowerCase() === "oui") {
            resyncProject(rl, githubSyncDir);
          }
        }
      );
    }
  });
})();
