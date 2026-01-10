import { useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";

const defaultFormatBudget = (value) =>
  Number.isFinite(value) ? value.toLocaleString("en-IN") : value;

const buildPalette = (count, seedHue) =>
  Array.from({ length: count }, (_, idx) => {
    const hue = (seedHue + idx * (360 / count)) % 360;
    // Muted, modern palette (less saturated / less bright than the default)
    return `hsl(${hue}, 42%, 52%)`;
  });

const truncateLabel = (label, max) => {
  if (!label || typeof label !== "string") return label;
  if (label.length <= max) return label;
  return `${label.slice(0, Math.max(0, max - 1))}…`;
};

const StatesPieChart = ({
  stateBudgetData = [],
  formatBudget = defaultFormatBudget,
  className = "h-full w-full animate-fade-down",
  style,
  innerRadius = 0.5,
  padAngle = 1,
  cornerRadius = 3,
  activeOuterRadiusOffset = 8,
  borderWidth = 1,
  arcLinkLabelsOffset = 1,
  arcLinkLabelsSkipAngle = 15,
  arcLinkLabelsDiagonalLength = 8,
  arcLinkLabelsStraightLength = 8,
  arcLinkLabelsTextOffset = 6,
  enableArcLinkLabels = false,
  arcLabelsSkipAngle = 30,
  arcLabelsRadiusOffset = 0.7,
  enableArcLabels = false,
  motionConfig = "gentle",
  transitionMode = "pushIn",
  customColors,
  colorSeed,
  hidePatterns = true,
  maxLabelLength = 10,
  showLegend = true,
  legendMode = "outside", // "outside" (recommended) | "nivo"
  legendItemMaxWidth = 140,
  legendFontSize = 12,
  legendTranslateY = 56,
  legendItemWidth = 110,
  legendItemHeight = 18,
  legendItemsSpacing = 10,
  legendSymbolSize = 10,
  margin,
  theme,
  ...pieProps
}) => {
  const processedData = useMemo(
    () =>
      stateBudgetData.map((state) => ({
        ...state,
        shortLabel: truncateLabel(state.label, maxLabelLength),
        fullLabel: state.label,
      })),
    [stateBudgetData, maxLabelLength]
  );

  // Stable per-instance seed allows unique charts while staying deterministic
  const seedHue = useMemo(
    () => (typeof colorSeed === "number" ? colorSeed : Math.random() * 360),
    [colorSeed]
  );

  const colors = useMemo(() => {
    if (Array.isArray(customColors) && customColors.length) {
      return customColors;
    }
    return buildPalette(processedData.length || 1, seedHue);
  }, [customColors, processedData.length, seedHue]);

  const resolvedMargin = useMemo(() => {
    if (margin) return margin;
    return {
      top: 20,
      right: 20,
      // If legend is rendered outside the SVG, the chart doesn't need extra bottom padding.
      bottom:
        showLegend && legendMode === "nivo"
          ? Math.max(70, legendTranslateY + 20)
          : 20,
      left: 20,
    };
  }, [legendMode, legendTranslateY, margin, showLegend]);

  const resolvedTheme = useMemo(() => {
    if (theme) return theme;
    return {
      text: {
        fontSize: 12,
        fill: "var(--color-text)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
      },
      legends: {
        text: {
          fontSize: 12,
          fill: "var(--color-text)",
        },
      },
      tooltip: {
        container: {
          borderRadius: 10,
        },
      },
    };
  }, [theme]);

  const outsideLegendItems = useMemo(() => {
    return processedData.map((d, idx) => ({
      id: d.id ?? d.label ?? idx,
      label: d.fullLabel ?? d.label ?? "",
      color: colors[idx % colors.length],
    }));
  }, [colors, processedData]);

  return (
    <div className={`flex flex-col ${className}`} style={style}>
      <div className="flex-1 min-h-0">
        <ResponsivePie
          data={processedData}
          margin={resolvedMargin}
          innerRadius={innerRadius}
          padAngle={padAngle}
          cornerRadius={cornerRadius}
          activeOuterRadiusOffset={activeOuterRadiusOffset}
          borderWidth={borderWidth}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          colors={colors}
          theme={resolvedTheme}
          sortByValue
          arcLinkLabelsOffset={arcLinkLabelsOffset}
          arcLinkLabelsSkipAngle={arcLinkLabelsSkipAngle}
          arcLinkLabelsDiagonalLength={arcLinkLabelsDiagonalLength}
          arcLinkLabelsStraightLength={arcLinkLabelsStraightLength}
          arcLinkLabelsTextOffset={arcLinkLabelsTextOffset}
          enableArcLinkLabels={enableArcLinkLabels}
          arcLinkLabel={(d) => d.data.shortLabel}
          arcLinkLabelsThickness={1.5}
          arcLinkLabelsColor={{ from: "color" }}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          arcLabelsSkipAngle={arcLabelsSkipAngle}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          enableArcLabels={enableArcLabels}
          arcLabelsRadiusOffset={arcLabelsRadiusOffset}
          tooltip={({ datum }) => (
            <div className="bg-[var(--color-surface)] p-2 shadow-lg rounded-md border border-[var(--color-border)]">
              <strong className="block text-[var(--color-text)]">
                {datum.data.fullLabel}
              </strong>
              <div className="flex items-center mt-1">
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: datum.color }}
                ></span>
                <span className="text-[var(--color-text)]">
                  Budget: ₹{formatBudget(datum.value)}
                </span>
              </div>
            </div>
          )}
          defs={
            hidePatterns
              ? []
              : [
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]
          }
          fill={
            hidePatterns
              ? []
              : [
                  { match: (d) => d.index % 3 === 0, id: "dots" },
                  { match: (d) => d.index % 3 === 1, id: "lines" },
                ]
          }
          motionConfig={motionConfig}
          transitionMode={transitionMode}
          legends={
            showLegend && legendMode === "nivo"
              ? [
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: legendTranslateY,
                    itemsSpacing: legendItemsSpacing,
                    itemWidth: legendItemWidth,
                    itemHeight: legendItemHeight,
                    itemTextColor: "var(--color-text)",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: legendSymbolSize,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "var(--color-text)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]
              : []
          }
          {...pieProps}
        />
      </div>

      {showLegend && legendMode === "outside" ? (
        <div className="pt-3">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {outsideLegendItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 min-w-0"
                style={{ fontSize: legendFontSize }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: item.color,
                    flex: "0 0 auto",
                  }}
                />
                <span
                  title={item.label}
                  className="truncate text-[var(--color-text)]"
                  style={{ maxWidth: legendItemMaxWidth }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StatesPieChart;
