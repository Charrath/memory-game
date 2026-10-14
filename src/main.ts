import "./scss/main.scss";

interface GameSettings {
  theme: string;
  player: string;
  board: number;
}

initApp();

// function init() {
//   const fieldRef = document.getElementById("field");
//   if (fieldRef) {
//     fieldRef.addEventListener("click", (e) => {
//       const card = (e.target as HTMLElement).closest(
//         ".card",
//       ) as HTMLButtonElement;
//       if (card) {
//         card.classList.toggle("is-flipped");
//       }
//     });
//   }
// }

function initApp(): void {
  setupHomeNavigation();
  setupSettings();
  setupSettingsSubmit();
}

function setupHomeNavigation(): void {
  const startButton = document.getElementById("home-screen-button");

  if (!startButton) return;

  startButton.addEventListener("click", () => {
    showSettingsScreen();
  });
}

function showSettingsScreen(): void {
  const homeScreen = document.getElementById("home-screen");
  const settingsScreen = document.getElementById("settings-screen");

  if (!homeScreen || !settingsScreen) return;

  homeScreen.hidden = true;
  settingsScreen.hidden = false;
}

function setupSettings(): void {
  const groups = ["theme", "player", "board"];

  groups.forEach((groupName) => {
    setupSettingGroup(groupName, `selected-${groupName}`);
  });
}

function setupSettingGroup(groupName: string, displayId: string): void {
  updateInitialSelection(groupName, displayId);
  const inputs = document.querySelectorAll<HTMLInputElement>(
    `input[name="${groupName}"]`,
  );

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      updateSettingDisplay(input, displayId);
    });
  });
}

function updateInitialSelection(groupName: string, displayId: string): void {
  const selectedInput = document.querySelector<HTMLInputElement>(
    `input[name="${groupName}"]:checked`,
  );

  if (selectedInput) {
    updateSettingDisplay(selectedInput, displayId);
  }
}

function updateSettingDisplay(
  input: HTMLInputElement,
  displayId: string,
): void {
  const display = document.getElementById(displayId);
  const label = input.closest("label");

  if (!display || !label) return;

  display.textContent = label.textContent?.trim() ?? "";
}

function setupSettingsSubmit(): void {
  const form = document.querySelector<HTMLFormElement>(
    ".settings__form",
  );

  if (!form) return;

  form.addEventListener("submit", handleSettingsSubmit);
}

function handleSettingsSubmit(event: SubmitEvent): void {
  event.preventDefault();

  const settings = getGameSettings();

  if (!settings) return;

  startGame(settings);
}

function getGameSettings(): GameSettings | null {
  const theme = document.querySelector<HTMLInputElement>('input[name="theme"]:checked');
  const player = document.querySelector<HTMLInputElement>('input[name="player"]:checked');
  const board = document.querySelector<HTMLInputElement>('input[name="board"]:checked');

  if (!theme || !player || !board) return null;

  return {
    theme: theme.value,
    player: player.value,
    board: Number(board.value),
  };
}

function startGame(settings: GameSettings): void {
  console.log(settings);
}
