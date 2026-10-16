

interface SettingOption {
  label: string;
  [key: string]: string | number;
}
export type SettingConfig = {
  [group: string]: {
    [value: string]: SettingOption;
  };
};

export const settings = {
  theme: {
    coding: {
      label: "Code vibes theme",
      preview: "/assets/images/settings/themes/code.png",
      primaryColor: "#FFB800",
      borderColor: "#000000",
    },

    gaming: {
      label: "Gaming theme",
      preview: "/assets/images/settings/themes/gaming.svg",
      primaryColor: "#7654D1",
      borderColor: "#FFFFFF",
    },

    projects: {
      label: "DA Projects theme",
      preview: "/assets/images/settings/themes/projects.svg",
      primaryColor: "#FFFFFF",
      borderColor: "#000000",
    },

    foods: {
      label: "Foods theme",
      preview: "/assets/images/settings/themes/foods.png",
      primaryColor: "#FF8000",
      borderColor: "#FFFFFF",
    },
  },

  player: {
    blue: {
      label: "Blue Player",
      color: "#0000FF",
    },

    orange: {
      label: "Orange Player",
      color: "#FFA500",
    },
  },

  board: {
    16: {
      label: "Board-16 Cards",
      rows: 4,
      columns: 4,
    },

    24: {
      label: "Board-24 Cards",
      rows: 4,
      columns: 6,
    },

    36: {
      label: "Board-36 Cards",
      rows: 6,
      columns: 6,
    },
  },
} as const satisfies SettingConfig;

export type Theme = keyof typeof settings.theme;
export type Player = keyof typeof settings.player;
export type BoardSize = keyof typeof settings.board;

export const THEMES = Object.keys(settings.theme) as Theme[];
export const PLAYERS = Object.keys(settings.player) as Player[];
export const BOARD_SIZES = Object.keys(settings.board).map(Number) as BoardSize[];
