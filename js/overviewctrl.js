myApp.controller('overviewctrl', function($scope,$http, $interval, $location) {
  $scope.allpos = []
  $scope.longpos = []
  $scope.shortpos = []
  $scope.basicobj = {}
  $scope.side = []
  $scope.sector = []
  $scope.category = []
  $scope.mcap = []
  $scope.liquidity = []

  $interval(function(){$scope.makePosReq(); },10000);
  $interval(function(){$scope.makeSideReq(); },10000);
  $interval(function(){$scope.makeSectorReq(); },10000);
  $interval(function(){$scope.makeCategoryReq(); },10000);
  $interval(function(){$scope.makeMcapReq(); },10000);
  $interval(function(){$scope.makeLiquidityReq(); },10000);

  //$scope.names = [{name:"Govind", amt: "860,00,00,000"},{name:"Rohit", amt: "750,00,00,000"},{name: "Adil (Jit)", amt:"10,00,00,000"}, {name:"Uday (Ashish)", amt:"13,00,00,000"}, {name:"PB (StatArb)", amt:5,00,00,000}];
  $scope.names = [{name: "Govind", amt: "950,00,00,000", acc: 40095 }, {name: "Rohit", amt: "860,00,00,000", acc:40094}, {name: "Adil (Jit)", amt:"10,00,00,000", acc:40093},{name:"Uday (Ashish)", amt:"13,00,00,000", acc:40092},{name:"PB (StatArb)",amt:"10,00,00,000", acc:40097}];
  $scope.account = $scope.names[0];
  $scope.amount = $scope.account.amt;
  $scope.name = $scope.account.name;

  $scope.changeUser = function(selected) {
    $scope.amount = selected.amt
    $scope.name = selected.name

    $scope.allpos = []
    $scope.longpos = []
    $scope.shortpos = []
    $scope.basicobj = {}
    $scope.side = []
    $scope.sector = []
    $scope.category = []
    $scope.mcap = []
    $scope.liquidity = []

    $scope.makePosReq();
    $scope.makeSideReq();
    $scope.makeSectorReq();
    $scope.makeCategoryReq();
    $scope.makeMcapReq();
    $scope.makeLiquidityReq();
  };

  $scope.activeMenu = function(page) {
    var current = $location.url().substring(1);
    if (current == "" && page == "home") {
      return true;
    }
    return page === current ? "active" : "";
  };

  $scope.makePosReq = function() {
    $http({
        method: 'POST',
        url: 'http://ec2-52-66-242-151.ap-south-1.compute.amazonaws.com/rmsapp/Snapshots/Position',
        headers: {'Content-Type': 'application/json'},
        data: '{"sessionId":"a7dd2762-cc06-4d31-b21c-fb08d5fa8b74","accountId":"' + $scope.name +'"}'
    }).then(function(response) {
      $scope.allpos = response.data.data.posSnapshot
      $scope.basicobj = response.data.data.basicDetails
      tempLong = []
      tempShort = []
      for (var i =0; i < $scope.allpos.length; i++) {
        if ($scope.allpos[i].side == 'Buy') {
          tempLong.push($scope.allpos[i])
        } else {
          tempShort.push($scope.allpos[i])
          $scope.shortpos.push($scope.allpos[i])
        }
      }
      $scope.longpos = tempLong.slice();
      $scope.shortpos = tempShort.slice();

    });
  };

  $scope.makeSideReq = function() {
    $http( {
        method: 'POST',
        url: 'http://ec2-52-66-242-151.ap-south-1.compute.amazonaws.com/rmsapp/Snapshots/Side',
        headers: {'Content-Type': 'application/json'},
        data: '{"sessionId":"a7dd2762-cc06-4d31-b21c-fb08d5fa8b74","accountId":"' + $scope.name +'"}'
    }).then(function(response) {
        $scope.side = response.data.data.sideSnapshot

    });
  };

  $scope.makeSectorReq = function() {
    $http( {
        method: 'POST',
        url: 'http://ec2-52-66-242-151.ap-south-1.compute.amazonaws.com/rmsapp/Snapshots/Sector',
        headers: {'Content-Type': 'application/json'},
        data: '{"sessionId":"a7dd2762-cc06-4d31-b21c-fb08d5fa8b74","accountId":"' + $scope.name +'"}'
    }).then(function(response) {
        $scope.sector = response.data.data.sectorSnapshot

    });
  };

  $scope.makeCategoryReq = function() {
    $http( {
        method: 'POST',
        url: 'http://ec2-52-66-242-151.ap-south-1.compute.amazonaws.com/rmsapp/Snapshots/Category',
        headers: {'Content-Type': 'application/json'},
        data: '{"sessionId":"a7dd2762-cc06-4d31-b21c-fb08d5fa8b74","accountId":"' + $scope.name +'"}'
    }).then(function(response) {
        $scope.category = response.data.data.categorySnapshot

    });
  };

  $scope.makeMcapReq = function() {
    $http( {
        method: 'POST',
        url: 'http://ec2-52-66-242-151.ap-south-1.compute.amazonaws.com/rmsapp/Snapshots/MarketCapital',
        headers: {'Content-Type': 'application/json'},
        data: '{"sessionId":"a7dd2762-cc06-4d31-b21c-fb08d5fa8b74","accountId":"' + $scope.name +'"}'
    }).then(function(response) {
        $scope.mcap = response.data.data.mcapSnapshot

    });
  };

  $scope.makeLiquidityReq = function() {
    $http( {
        method: 'POST',
        url: 'http://ec2-52-66-242-151.ap-south-1.compute.amazonaws.com/rmsapp/Snapshots/Liquidity',
        headers: {'Content-Type': 'application/json'},
        data: '{"sessionId":"a7dd2762-cc06-4d31-b21c-fb08d5fa8b74","accountId":"' + $scope.name +'"}'
    }).then(function(response) {
        $scope.liquidity = response.data.data.liquiditySnapshot

    });
  };

  var data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
  ]
};

var options = {
  seriesBarDistance: 10
};

var responsiveOptions = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

new Chartist.Bar('.ct-chart', data, options, responsiveOptions);


})
