import { ResponsiveRadar } from "@nivo/radar";

const OutcomesRadialChart = ({ data }) => {
  return (
    <div className="h-full animate-fade-up">
      <ResponsiveRadar
        data={data}
        keys={["value"]}
        indexBy="metric"
        maxValue={100}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: "color" }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={16}
        enableDots={true}
        dotSize={8}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        dotBorderColor={{ from: "color" }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: "nivo" }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="gentle"
        isInteractive={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "var(--color-text-secondary)",
                fontSize: 13,
                fontWeight: 600,
              },
            },
          },
          grid: {
            line: {
              stroke: "var(--color-border)",
              strokeWidth: 1,
            },
          },
          dots: {
            text: {
              fill: "var(--color-text)",
              fontSize: 13,
              fontWeight: 700,
            },
          },
        }}
        tooltip={({ index, value }) => (
          <div className="bg-[var(--color-surface)] p-2 shadow-lg rounded-md border border-[var(--color-border)]">
            <div className="text-[var(--color-text)] font-medium">
              {data[index].metric}
            </div>
            <div className="text-[var(--color-text)] mt-1">
              Score: <strong>{value}%</strong>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default OutcomesRadialChart;
