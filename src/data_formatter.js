class PreviewModalData {
  constructor(propName, count, length) {
    this.value = propName;
    this.count = count;
    this.percentage = (count / length * 100).toFixed(0);
  }
};

const getValueCountArray = (previewColData) => {
  let counts = {};
  let results = [];
  previewColData.map(obj => {
    counts[`${obj}`] = (counts[`${obj}`] || 0) + 1;
  });
  results.push(counts);
  return results;
};

export const parseData = {
  mainTable(dataList) {
    let container = {};
    let results = [];
    for (let i = 0; i < dataList[0].datapoints.length; i++) {
      for (const event of dataList) {
        container[`${event.target.slice(29)}`] = event.datapoints[i][0]
      }
      let newContainer = angular.copy(container);
      results.push(newContainer);
    }
    return results;
  },

  previewModal(previewColData, previewColDataLength) {
    let counts = getValueCountArray(previewColData);
    let results = [];
    counts.map(obj => {
      for(const prop in obj) {
        let container = new PreviewModalData(`${prop}`, obj[`${prop}`], previewColDataLength);
        results.push(container);
      }
    })
    results.sort((a, b) => b.count - a.count);
    return results;
  }
}
