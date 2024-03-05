import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmSync } from "fs";

export const createFolder = (dir) => {
  mkdirSync(dir, { recursive: true });
  console.log("\x1b[32m%s\x1b[0m", `Dossier ${dir} créé avec succès!`);
};

export const deleteFolder = (dir) => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Le dossier ${dir} existe déjà. Suppression en cours...`
  );
  rmSync(dir, { recursive: true, force: true });
  console.log("\x1b[32m%s\x1b[0m", `Dossier ${dir} supprimé avec succès!`);
};

export const cloneProjects = (projectList, destDir, username) => {
  projectList.forEach((project) => {
    const projectDir = `${destDir}/${project}`;
    if (!existsSync(projectDir)) {
      const gitCloneCommand = `git clone https://github.com/${username}/${project}.git ${projectDir}`;
      try {
        execSync(gitCloneCommand);
        console.log(
          "\x1b[36m%s\x1b[0m",
          `Projet ${project} cloné avec succès dans ${projectDir}`
        );
      } catch (error) {
        console.error(
          "\x1b[31m%s\x1b[0m",
          `Erreur lors du clonage du projet ${project}: ${error}`
        );
      }
    } else {
      console.log(
        "\x1b[33m%s\x1b[0m",
        `Le dossier ${projectDir} existe déjà. Le projet ${project} ne sera pas cloné.`
      );
    }
  });
};

function listProjects(githubSyncDir) {
  const projects = readdirSync(githubSyncDir);
  projects.forEach((project, index) => {
    console.log(`${index + 1}. ${project}`);
  });
}

export async function resyncProject(rl, githubSyncDir) {
  console.log("Projets disponibles dans le dossier GithubSync :");
  listProjects(githubSyncDir);
  rl.question(
    "Veuillez saisir le numéro du projet que vous souhaitez resynchroniser : ",
    (answer) => {
      const projects = readdirSync(githubSyncDir);
      const selectedProjectIndex = parseInt(answer) - 1;
      const selectedProject = projects[selectedProjectIndex];
      console.log(`Vous avez sélectionné le projet : ${selectedProject}`);
      // Ici, vous pouvez ajouter votre logique pour resynchroniser le projet sélectionné
      rl.close();
    }
  );
}
