import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const OutcomesRadialChart = ({ data }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="h-full animate-fade-up">
      <ResponsiveRadar
        data={data}
        keys={["value"]}
        indexBy="metric"
        maxValue={100}
        margin={
          isMobile
            ? { top: 20, right: 20, bottom: 20, left: 20 }
            : { top: 40, right: 50, bottom: 40, left: 50 }
        }
        curve="linearClosed"
        borderWidth={2.5}
        borderColor="var(--color-primary)"
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={isMobile ? 10 : 14}
        enableDots={true}
        dotSize={isMobile ? 8 : 10}
        dotColor="var(--color-surface)"
        dotBorderWidth={2.5}
        dotBorderColor="var(--color-primary)"
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={isMobile ? -12 : -14}
        colors={["var(--color-primary)"]}
        fillOpacity={0.18}
        blendMode="normal"
        animate={true}
        motionConfig="gentle"
        isInteractive={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "var(--color-text)",
                fontSize: isMobile ? 11 : 13,
                fontWeight: 600,
              },
            },
          },
          grid: {
            line: {
              stroke: "var(--color-border)",
              strokeWidth: 1.5,
            },
          },
          dots: {
            text: {
              fill: "var(--color-text)",
              fontSize: isMobile ? 11 : 12,
              fontWeight: 700,
            },
          },
        }}
        tooltip={({ index, value }) => (
          <div className="bg-[var(--color-surface)] px-4 py-3 shadow-xl rounded-xl border-2 border-[var(--color-primary)] backdrop-blur-sm">
            <div className="text-[var(--color-text)] font-semibold text-sm mb-1.5">
              {data[index].metric}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
              <span className="text-[var(--color-text-secondary)] text-sm">
                Score:{" "}
                <span className="font-bold text-[var(--color-primary)]">
                  {value}%
                </span>
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default OutcomesRadialChart;
