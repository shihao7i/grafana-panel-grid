import {MetricsPanelCtrl} from 'app/plugins/sdk';
import angular from 'angular';
import lodash from 'lodash';
import moment from 'moment';
import {gridColDefs} from './gridColDefs';
import {parseData} from './data_formatter';
import {previewModalTemplate} from './previewModalTemplate';
import {previewModalColDefs} from './previewModalColDefs';
import './css/ui-grid.css!';
import './css/progress-bar.css!';

export class UiGridCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$uibModal = $injector.get('$uibModal');

    let panelDefaults = {
      name: 'UI Grid',
      datasource: null, // datasource name, null = default datasource
      gridOptions: {
        paginationPageSizes: [25, 50, 100],
        paginationPageSize: 25,
        enableGridMenu: true,
        columnDefs: gridColDefs,
        onRegisterApi: (gridApi) => {
          this.gridApi = gridApi;
          this.configureColMenu();
        }
      }
    }

    angular.merge(this.panel, panelDefaults);

    this.events.on('data-received', dataList => this.onDataReceived(dataList));
    this.events.on('data-snapshot-load', dataList => this.onDataReceived(dataList));


  }

  /**
   * receive data from handleQueryResult(result) in MetricsPanelCtrl.
   * @param  {Array} dataList
   * @return {Void}
   */
  onDataReceived(dataList) {
    dataList.forEach(x => {
      console.log(x.target.slice(29));
    })
    console.log('dataList', dataList)
    this.panel.gridOptions.data = this.transformData(dataList);
    console.log('this.panel.gridOptions.data', this.panel.gridOptions.data);
    this.originalGridData = _.clone(this.panel.gridOptions.data);
  }

  configureColMenu() {
    return this.panel.gridOptions.columnDefs = this.panel.gridOptions.columnDefs.map(columnDefs => {
      let that = this;
      columnDefs.menuItems = [{
        title: 'Preview Top/Least',
        icon: 'ui-grid-icon-info-circled',
        action() {
          that.currentPreviewColName = this.context.col.displayName;
          that.generatePreviewModal();
        }
      }]
      return columnDefs;
    });
  }

  getSelectedCount() {
    this.selectedCount = this.gridApi.selection.getSelectedCount();
    return this.selectedCount;
  }

  resetTable() {
    this.selectedRowsData = this.gridApi.selection.getSelectedRows();
    if (this.selectedRowsData.length === 0) {
      this.panel.gridOptions.data = this.originalGridData;
      this.panel.datasource = null;
    } else {
      this.panel.gridOptions.data = this.selectedRowsData;
      this.gridApi.selection.clearSelectedRows();
      this.panel.datasource = 'selectedRows';
    }
  }

  getPreviewModalData(displayName) {
    let previewColData = this.panel.gridOptions.data.map(event => event[`${displayName}`]);
    let length = previewColData.length;
    this.previewModalData = parseData.previewModal(previewColData, length);
    return this.previewModalData;
  };

  generatePreviewModal() {
    let previwModal = this.$uibModal.open({
      template: previewModalTemplate,
      controller: ($scope, $uibModalInstance) => {
        $scope.currentPreviewColName = this.currentPreviewColName.toUpperCase();
        $scope.gridOptions = {
          columnDefs: previewModalColDefs
        };
        $scope.gridOptions.data = this.getPreviewModalData(this.currentPreviewColName);

        // Preview Modal Methods
        $scope.close = () => $uibModalInstance.dismiss('cancel');
      }
    });
  }

  /**
   * transform data format to ui-grid required format
   * @param  {Array} dataList
   * @return {Func} parseData.mainTable
   */
  transformData(dataList) {
    return parseData.mainTable(dataList);
  }

};

UiGridCtrl.templateUrl = 'module.html';
