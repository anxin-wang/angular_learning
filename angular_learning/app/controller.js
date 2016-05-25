function PhoneListCtrl($scope) {
    $scope.phones = [
        {"name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S."},
        {"name": "Motorola XOOM? with Wi-Fi",
            "snippet": "The Next, Next Generation tablet."},
        {"name": "MOTOROLA XOOM?",
            "snippet": "The Next, Next Generation tablet."}
    ];
}

function PhoneListCtrl2($scope) {
    $scope.phones = [
        {"name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S.",
            "age": 0},
        {"name": "Motorola XOOM? with Wi-Fi",
            "snippet": "The Next, Next Generation tablet.",
            "age": 1},
        {"name": "MOTOROLA XOOM?",
            "snippet": "The Next, Next Generation tablet.",
            "age": 2}
    ];

    $scope.orderProp = 'age';
}