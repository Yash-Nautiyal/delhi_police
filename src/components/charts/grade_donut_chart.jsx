import { ResponsivePie } from '@nivo/pie';

const GradeDonutChart = ({ data }) => {
  const totalStudents = data.reduce((sum, d) => sum + d.count, 0);

  const processedData = data.map(item => ({
    id: item.label,
    label: item.label,
    value: item.count
  }));

  return (
    <div className="h-full w-full animate-fade-up">
      <ResponsivePie
        data={processedData}
        margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
        innerRadius={0.6}
        padAngle={2}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        borderWidth={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="var(--color-text)"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
        enableArcLinkLabels={true}
        colors={{ scheme: 'paired' }}
        layers={[
          'arcs',
          'arcLabels',
          'arcLinkLabels',
          'legends',
          ({ centerX, centerY }) => (
            <g>
              <text
                x={centerX}
                y={centerY - 10}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  fill: 'var(--color-text)',
                }}
              >
                {totalStudents}
              </text>
              <text
                x={centerX}
                y={centerY + 15}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: '12px',
                  fill: 'var(--color-text-secondary)',
                }}
              >
                Total Students
              </text>
            </g>
          ),
        ]}
        tooltip={({ datum }) => (
          <div className="bg-[var(--color-surface)] p-3 shadow-lg rounded-md border border-[var(--color-border)]">
            <strong className="block text-[var(--color-text)]">
              {datum.label}
            </strong>
            <div className="flex items-center mt-1">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: datum.color }}
              />
              <span className="text-[var(--color-text)]">
                Students: <strong>{datum.value}</strong>
              </span>
            </div>
            <div className="text-[var(--color-text-secondary)] text-xs mt-1">
              {((datum.value / totalStudents) * 100).toFixed(1)}% of total
            </div>
          </div>
        )}
        theme={{
          labels: {
            text: {
              fill: 'var(--color-text)',
              fontSize: 12,
              fontWeight: 600
            }
          }
        }}
        animate={true}
        motionConfig="gentle"
        transitionMode="pushIn"
      />
    </div>
  );
};

export default GradeDonutChart;

