import "./scss/main.scss";

import {
  settings,
  THEMES,
  PLAYERS,
  BOARD_SIZES,
  type Theme,
  type Player,
  type BoardSize,
  type SettingConfig,
} from "./config/settings";

interface GameSettings {
  theme: Theme;
  player: Player;
  board: BoardSize;
}

function isValidOption<T extends string | number>(
  value: string | number,
  options: readonly T[],
): value is T {
  return options.some((option) => option === value);
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

  startButton.addEventListener("click", showSettingsScreen);
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

  for (const groupName of groups) {
    setupSettingGroup(groupName, `selected-${groupName}`);
  }
}

function setupSettingGroup(groupName: string, displayId: string): void {
  setupSettingChangeListeners(groupName, displayId);
}

function setupSettingChangeListeners(
  groupName: string,
  displayId: string,
): void {
  const inputs = document.querySelectorAll<HTMLInputElement>(
    `input[name="${groupName}"]`,
  );

  for (const input of inputs) {
    input.addEventListener("change", () => {
      updateSettingDisplay(input, displayId);
      if (groupName === "theme") {
        updateThemePreview(input);
      }
    });
  }
}

function getSettingLabel(group: string, value: string): string | null {
  const groups: SettingConfig = settings;
  return groups[group]?.[value]?.label ?? null;
}

function updateSettingDisplay(
  input: HTMLInputElement,
  displayId: string,
): void {
  const display = document.getElementById(displayId);
  if (!display) return;

  const label = getSettingLabel(input.name, input.value);
  if (label === null) return;

  display.textContent = label;
}

function updateThemePreview(input: HTMLInputElement): void {
  if (!isValidOption(input.value, THEMES)) return;

  const preview = document.querySelector<HTMLElement>(
    ".settings__preview-themes",
  );
  if (!preview) return;

  const imagePath = settings.theme[input.value].preview;
  preview.style.backgroundImage = `url("${imagePath}")`;
}

function setupSettingsSubmit(): void {
  const form = document.querySelector<HTMLFormElement>(".settings__form");

  if (!form) return;

  form.addEventListener("submit", handleSettingsSubmit);

  form.addEventListener("change", () => {
    updateSettingsState(form);
  });

  updateSettingsState(form);
}

function updateSettingsState(form: HTMLFormElement): void {
  const gameSettings = getGameSettings(form);
  const isComplete = gameSettings !== null;

  const settingsButton =
    document.querySelector<HTMLButtonElement>(".settings__button");

  if (!settingsButton) return;

  settingsButton.disabled = !isComplete;

  form.classList.toggle("is-complete", isComplete);
}

function handleSettingsSubmit(event: SubmitEvent): void {
  event.preventDefault();

  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;

  const settings = getGameSettings(form);
  if (!settings) return;

  startGame(settings);
}

function getGameSettings(form: HTMLFormElement): GameSettings | null {
  const data = new FormData(form);
  const theme = data.get("theme");
  const player = data.get("player");
  const board = Number(data.get("board"));

  if (typeof theme !== "string" || !isValidOption(theme, THEMES)) return null;
  if (typeof player !== "string" || !isValidOption(player, PLAYERS))
    return null;
  if (!isValidOption(board, BOARD_SIZES)) return null;

  return { theme, player, board };
}

function startGame(settings: GameSettings): void {
  console.log(settings);
}
