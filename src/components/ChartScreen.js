import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;
const ChartScreen = props => {
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: () => '#303030',
    useShadowColorFromDataset: false,
  };
  const data = {
    datasets: [
      {
        data: props.value,
        color: () => 'rgba(153, 0, 0, 0.3)',
        strokeWidth: 5,
      },
    ],
  };
  return (
    <LineChart
      fromZero={true}
      data={data}
      width={screenwidth * 1.118}
      height={screenheight / 2.5}
      chartConfig={chartConfig}
      withDots={false}
      withInnerLines={false}
      withOuterLines={false}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      style={props.style}
    />
  );
};

export default ChartScreen;
