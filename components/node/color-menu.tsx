export const colorList: Array<string> = [
  "",
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "pink",
];

export const colorMap: Record<string, string> = {
  "": "",
  red: "#FF0000",
  orange: "#FFA500",
  yellow: "#FFFF00",
  green: "#00FF00",
  cyan: "#00FFFF",
  blue: "#0000FF",
  indigo: "#4B0082",
  purple: "#800080",
  pink: "#FFC0CB",
};

export const ColorMenu = colorList.map((c: string, i: number) => ({
  label: (
    <div
      style={{
        background: colorMap[c] || "#eee",
        width: 16,
        height: 16,
        borderRadius: "50%",
      }}
    />
  ),
  name: c,
  key: i,
}));
