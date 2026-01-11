import React, { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import useMediaQuery from "../../hooks/useMediaQuery";

const ParticipationChart = ({ data }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Calculate averages
  const avgActivities = useMemo(() => {
    return (
      data.reduce((sum, student) => sum + student.activities, 0) / data.length
    );
  }, [data]);

  const avgTrainings = useMemo(() => {
    return (
      data.reduce((sum, student) => sum + student.trainings, 0) / data.length
    );
  }, [data]);

  // Transform data for better display - sort by total participation
  const chartData = useMemo(() => {
    return data
      .map((student) => ({
        student: student.name.split(" ")[0], // Use first name only for better spacing
        Activities: student.activities,
        Trainings: student.trainings,
        avgActivities: avgActivities,
        avgTrainings: avgTrainings,
      }))
      .sort(
        (a, b) => b.Activities + b.Trainings - (a.Activities + a.Trainings)
      );
  }, [data, avgActivities, avgTrainings]);

  return (
    <div className="h-full w-full">
      <div
        className={isMobile ? "h-full w-full overflow-x-auto" : "h-full w-full"}
      >
        <div className={isMobile ? "min-w-[520px] h-full" : "h-full w-full"}>
          <ResponsiveBar
            data={chartData}
            keys={["Activities", "Trainings"]}
            indexBy="student"
            // Extra bottom space to fit legend + rotated tick labels
            margin={
              isMobile
                ? { top: 10, right: 10, bottom: 95, left: 34 }
                : { top: 10, right: 15, bottom: 80, left: 40 }
            }
            padding={isMobile ? 0.3 : 0.25}
            groupMode="grouped"
            valueScale={{ type: "linear", min: 0, max: "auto" }}
            indexScale={{ type: "band", round: true }}
            colors={["#4FC3F7", "#FF8A65"]}
            borderRadius={4}
            borderWidth={0}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: isMobile ? 6 : 8,
              tickRotation: isMobile ? -55 : -30,
              legend: "",
              legendPosition: "middle",
              legendOffset: isMobile ? 50 : 40,
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: isMobile ? 6 : 8,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: -35,
              tickValues: 5,
            }}
            enableGridY={true}
            gridYValues={5}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="#ffffff"
            layers={[
              "grid",
              "axes",
              "bars",
              "markers",
              "legends",
              "annotations",
              // Custom layer for average lines
              ({ xScale, yScale }) => {
                const activitiesY = yScale(avgActivities);
                const trainingsY = yScale(avgTrainings);

                return (
                  <g>
                    {/* Activities average line */}
                    <line
                      x1={xScale.range()[0]}
                      y1={activitiesY}
                      x2={xScale.range()[1]}
                      y2={activitiesY}
                      stroke="#4FC3F7"
                      strokeWidth={2}
                      strokeDasharray="6 4"
                      opacity={0.7}
                    />
                    <text
                      x={xScale.range()[1] - 5}
                      y={activitiesY - 5}
                      textAnchor="end"
                      fill="#4FC3F7"
                      fontSize={isMobile ? 9 : 10}
                      fontWeight={600}
                    >
                      Avg: {avgActivities.toFixed(1)}
                    </text>

                    {/* Trainings average line */}
                    <line
                      x1={xScale.range()[0]}
                      y1={trainingsY}
                      x2={xScale.range()[1]}
                      y2={trainingsY}
                      stroke="#FF8A65"
                      strokeWidth={2}
                      strokeDasharray="6 4"
                      opacity={0.7}
                    />
                    <text
                      x={xScale.range()[1] - 5}
                      y={trainingsY - 5}
                      textAnchor="end"
                      fill="#FF8A65"
                      fontSize={isMobile ? 9 : 10}
                      fontWeight={600}
                    >
                      Avg: {avgTrainings.toFixed(1)}
                    </text>
                  </g>
                );
              },
            ]}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: isMobile ? 78 : 70,
                itemsSpacing: isMobile ? 10 : 15,
                itemWidth: isMobile ? 72 : 80,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 0.7,
                    },
                  },
                ],
              },
            ]}
            tooltip={({ id, value, indexValue, color }) => (
              <div className="bg-[var(--color-surface)] px-3 py-2 shadow-lg rounded-lg border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[var(--color-text)] font-semibold text-sm">
                    {indexValue}
                  </span>
                </div>
                <div className="text-[var(--color-text-secondary)] text-xs">
                  {id}:{" "}
                  <span className="text-[var(--color-text)] font-semibold">
                    {value}
                  </span>
                </div>
                <div className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                  Avg:{" "}
                  <span className="text-[var(--color-text)] font-semibold">
                    {id === "Activities"
                      ? avgActivities.toFixed(1)
                      : avgTrainings.toFixed(1)}
                  </span>
                </div>
              </div>
            )}
            theme={{
              background: "transparent",
              axis: {
                ticks: {
                  line: {
                    stroke: "transparent",
                  },
                  text: {
                    fill: "var(--color-text-secondary)",
                    fontSize: isMobile ? 10 : 11,
                    fontWeight: 500,
                  },
                },
                legend: {
                  text: {
                    fill: "var(--color-text)",
                    fontSize: 12,
                    fontWeight: 600,
                  },
                },
              },
              grid: {
                line: {
                  stroke: "var(--color-border)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                },
              },
              labels: {
                text: {
                  fill: "#ffffff",
                  fontWeight: 600,
                  fontSize: 10,
                },
              },
              legends: {
                text: {
                  fill: "var(--color-text)",
                  fontSize: 11,
                  fontWeight: 600,
                },
              },
            }}
            animate={true}
            motionConfig={{
              mass: 1,
              tension: 170,
              friction: 26,
              clamp: false,
              precision: 0.01,
              velocity: 0,
            }}
            role="application"
            ariaLabel="Student participation and training chart"
          />
        </div>
      </div>
    </div>
  );
};

export default ParticipationChart;
