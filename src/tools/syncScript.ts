import { platform } from "os";

export function getDesktopDir() {
  const platformName = platform();
  if (platformName === "win32") {
    return `${process.env.USERPROFILE}\\Desktop`;
  } else {
    return `${process.env.HOME}/Desktop`;
  }
}
