export const previewModalTemplate =
  `<div class="modal-header">
  <h3 class="modal-title">{{currentPreviewColName}}</h3>
</div><div>
<div class="modal-body">
  <div ui-grid="gridOptions" class="grid"></div>
</div>
<div class="modal-footer">
  <button class="btn btn-primary" ng-click="close()">Close</button>
</div>`
