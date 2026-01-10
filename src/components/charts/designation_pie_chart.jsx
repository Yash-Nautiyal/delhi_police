import { ResponsivePie } from '@nivo/pie';

const DesignationPieChart = ({ data }) => {
  // Function to shorten designation names for labels
  const shortenDesignation = (name) => {
    const abbreviations = {
      "Cyber Discipline Coordinator": "CDC",
      "Chief Cyber Security Dost": "CCSD",
      "Cyber Awareness Leader": "CAL"
    };
    return abbreviations[name] || name.substring(0, 3).toUpperCase();
  };

  // Process data to include shortened labels
  const processedData = data.map(item => ({
    id: item.label,
    label: shortenDesignation(item.label),
    value: item.count,
    fullLabel: item.label
  }));

  return (
    <div className="h-full w-full animate-fade-up">
      <ResponsivePie
        data={processedData}
        margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
        innerRadius={0}
        padAngle={2}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderWidth={1}
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
        arcLinkLabel={d => d.data.label}
        colors={{ scheme: 'nivo' }}
        tooltip={({ datum }) => (
          <div className="bg-[var(--color-surface)] p-3 shadow-lg rounded-md border border-[var(--color-border)]">
            <strong className="block text-[var(--color-text)]">
              {datum.data.fullLabel}
            </strong>
            <div className="flex items-center mt-1">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: datum.color }}
              />
              <span className="text-[var(--color-text)]">
                Count: <strong>{datum.value}</strong>
              </span>
            </div>
            <div className="text-[var(--color-text-secondary)] text-xs mt-1">
              {((datum.value / data.reduce((sum, d) => sum + d.count, 0)) * 100).toFixed(1)}%
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

export default DesignationPieChart;

