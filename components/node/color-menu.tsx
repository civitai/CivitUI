export const colorList: Array<string> = [
  "none",
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

export const ColorMenu = colorList.map((c: string | null, i: number) => ({
  label: (
    <div
      style={{
        background: c || "#eee",
        width: 16,
        height: 16,
        borderRadius: "50%",
      }}
    />
  ),
  name: c,
  key: i,
}));
