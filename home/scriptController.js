var globalPath = '';var mainApp = angular.module("mainApp", ['ngSanitize']);mainApp.factory('SelectedGroup', function () {    var fact = {};    fact.id = 0;    fact.name = null;    fact.type = 0;    fact.questionTypes = [];    return fact;});mainApp.controller("OnLoadController", ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {    $scope.userScore = "";    $scope.imageurl = "";    $http.get('/private/operations/onload.php')        .success(function (data) {                if (data.t == "s") {                    if (data.r == "" || data.r == null)                        globalPath = "/images/profile.png";                    else                        globalPath = data.r;                    $scope.imageurl = globalPath;                }            }        );}]);/** * Used to create new group */mainApp.controller("NewGroupController", ['$scope', '$http', function ($scope, $http) {    $scope.groupName = "";    $scope.isValidInfo = function () {        return $scope.groupName != null && $scope.groupName != "" && $scope.groupName.length < 257;    };    $scope.createGroup = function () {        var data = $.param({gn: $scope.groupName});        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/create_group.php', data, config)            .success(function (data) {                    $('#newGroupModel').modal('toggle');                    if (data.t == "s") {                        new Message('Success', 'Group created successfully.', MESSAGE_SUCCESS).show();                        window.location = '/home';                    } else {                        new Message('Error', data.r, MESSAGE_DANGER).show();                    }                }            );        $scope.groupName = "";    };}]);/** * Used to send question to server */mainApp.controller("AskQuestionController", ['$scope', '$http', 'SelectedGroup', '$rootScope', function ($scope, $http, SelectedGroup, $rootScope) {    $scope.question = null;    $scope.qDesc = null;    $scope.exDate = null;    $scope.questionTypes = null;    $scope.qType = null;    $scope.isValid = function () {        return $scope.question != null && $scope.question != "" && $scope.qType != null && $scope.qType != "";    };    $scope.setQuestionTypesList = function () {        //console.log('calling');        $scope.questionTypes = [];        var data = $.param({gid: SelectedGroup.id});        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/get_all_qt.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        for (i = 0; i < data.r.length; i++) {                            $scope.questionTypes[$scope.questionTypes.length] = [data.r[i][0], data.r[i][1], false];                        }                    } else {                        new Message('Error', data.r, MESSAGE_DANGER).show();                    }                }            );    };    $rootScope.$on("CallSetQuestionTypesList", function () {        $scope.setQuestionTypesList();    });    $scope.askQuestion = function () {        var date = new Date($scope.exDate);        var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();        var data = {gid: SelectedGroup.id, q: $scope.question, qt: $scope.qType[0], qd: $scope.qDesc, ex: dateStr};        data = $.param(data);        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/add_q.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        new Message('Success', 'Question posted successfully.', MESSAGE_SUCCESS).show();                    } else {                        new Message('Error', data.r, MESSAGE_DANGER).show();                    }                }            );    };}]);mainApp.controller("SettingController", ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {    $scope.username = "";    $scope.unickname = "";    $scope.usermail = "";    $scope.usermobile = "";    $scope.userdob = "";    $scope.userstreet = "";    $scope.usercity = "";    $scope.usercountry = "";    $scope.imageurl = "";    $scope.lock = false;    $scope.error1 = "";    $scope.error2 = "";    $scope.error3 = "";    $scope.sendImage = "";    $http.post('/private/operations/get_user_info.php')        .success(function (data) {                if (data.t == "s") {                    //console.log(data.r);                    $scope.username = data.r[0].user_name;                    $scope.nickname = data.r[0].nickname;                    $scope.usermail = data.r[0].login_id;                    $scope.usermobile = data.r[0].mobile;                    $scope.userdob = data.r[0].dob;                    $scope.userstreet = data.r[0].street;                    $scope.usercity = data.r[0].city;                    $scope.usercountry = data.r[0].country;                    $scope.imageurl = globalPath;                }            }        );    $scope.isValidInfo = function () {        return $scope.lock != false;    };    $scope.updateInfo = function (infoId) {        document.getElementById(infoId).readOnly = false;        $scope.lock = true;    };    $scope.imgUplaod = function (element) {        $scope.$apply(function (scope) {            var photofile = element.files[0];            var reader = new FileReader();            reader.onload = function (e) {                $scope.sendImage = e.target.result;                $scope.$apply();                if ($scope.sendImage === null || $scope.sendImage === "" || !($scope.sendImage)) {                    //new Message('No file has been uploaded', "", MESSAGE_DANGER).show();                    return;                }                var data = $.param({                    image: $scope.sendImage                });                var config = {                    headers: {                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'                    }                };                $http.post('/private/operations/img_upload.php', data, config)                    .success(function (data) {                            if (data.t == "s") {                                globalPath = data.r;                                $scope.imageurl = globalPath;                                window.location = '/home';                            }                        }                    );            };            reader.readAsDataURL(photofile);        });    };    $scope.update = function () {        var phno = /^[0-9]{10}$/;        var addr = /^[a-zA-Z]*$/;        if (!phno.test($scope.usermobile)) {            $scope.error1 = "Please enter a valid mobile number.";            return;        }        if (!addr.test($scope.usercity)) {            $scope.error3 = "enter valid city...!";            return;        }        else if ($scope.userstreet == null) {            $scope.error2 = "enter valid city...!";            return;        }        var data = $.param({            nname: $scope.nickname,            mob: $scope.usermobile,            street: $scope.userstreet,            city: $scope.usercity        });        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/update_user_info.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        window.location = '/home';                    } else {                        new Message('Error', data.r, MESSAGE_DANGER).show();                    }                }            );    };}]);/** * Used to display and add members of group */mainApp.controller("AddMembersController", ['$scope', '$http', 'SelectedGroup', '$rootScope', function ($scope, $http, SelectedGroup, $rootScope) {    $scope.groupName = null;    $scope.updateName = "";    $scope.admin = null;    $scope.members = [];    $scope.specialMembers = [];    $scope.questionTypes = [];    $scope.questionType = "";    $scope.ranks = [];    $scope.currentTab = 0;    $scope.currentSelectedQuest = 0;    $scope.email = null;    var addingMemberId = null;    $scope.isValidKnowenId = function () {        return ($scope.email != null && $scope.email != "")    };    $scope.isValidQuestionType = function () {        if ($scope.questionType.length > 0)            return true;        return false;    };    $scope.isValid = function () {        if ($scope.updateName.length > 0)            return true;        return false;    };    function isAlreadyAdded(email) {        for (i = 0; i < $scope.specialMembers.length; i++) {            if ($scope.specialMembers[i][0] === email) {                return true;            }        }        for (i = 0; i < $scope.members.length; i++) {            if ($scope.members[i][0] === $scope.email) {                return true;            }        }        return false;    }    //its my    $scope.rename = function () {        if (!($scope.updateName == SelectedGroup.name)) {            var data = $.param({                gid: SelectedGroup.id,                updateName: $scope.updateName            });            var config = {                headers: {                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'                }            };            $http.post('/private/operations/update_grp_name.php', data, config)                .success(function (data) {                        if (data.t == "s") {                            SelectedGroup.name = data.r;                            window.location = '/home';                        } else {                            new Message('Error', data.r, MESSAGE_DANGER).show();                        }                    }                );        }    };    $scope.add = function () {        if (isAlreadyAdded($scope.email)) {            new Message('Error', 'User is already present in group', MESSAGE_DANGER).show();            return;                 // Member is already added        }        var data = $.param({eid: $scope.email, gid: SelectedGroup.id});        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        addingMemberId = $scope.email;        if ($scope.currentTab == 0) {            $http.post('/private/operations/add_sm.php', data, config)                .success(function (data) {                        if (data.t == "e") {                            new Message('Error', data.r, MESSAGE_DANGER).show();                        } else {                            if (SelectedGroup.type == 1) {                                $scope.specialMembers[$scope.specialMembers.length] = [addingMemberId, data.r, false];                            } else {                                $scope.specialMembers[$scope.specialMembers.length] = [addingMemberId, data.r];                            }                        }                    }                );            $scope.email = "";        } else if ($scope.currentTab == 1) {               // For members tab            $http.post('/private/operations/add_m.php', data, config)                .success(function (data) {                        if (data.t == "e") {                            new Message('Error', data.r, MESSAGE_DANGER).show();                        } else {                            if (SelectedGroup.type == 1 || SelectedGroup.type == 2) {                                $scope.members[$scope.members.length] = [addingMemberId, data.r, false];                            } else {                                $scope.members[$scope.members.length] = [addingMemberId, data.r];                            }                        }                    }                );            $scope.email = "";        } else {            data = $.param({qt: $scope.questionType, gid: SelectedGroup.id});            addingMemberId = $scope.questionType;            $http.post('/private/operations/add_qt.php', data, config)                .success(function (data) {                        if (data.t == "e") {                            new Message('Error', data.r, MESSAGE_DANGER).show();                        } else {                            $scope.questionTypes[$scope.questionTypes.length] = [data.r, addingMemberId, false];                        }                    }                );            $scope.questionType = "";        }    };    $scope.hasPermission = function () {        if (($scope.currentTab == 0 && SelectedGroup.type == 1) ||            ($scope.currentTab == 1 && ((SelectedGroup.type == 1 || SelectedGroup.type == 2))))            return true;        return false;    };    $scope.isAdmin = function () {        return SelectedGroup.type == 1;    };    /**     *     */    $scope.remove = function () {        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        var data = null;        if ($scope.currentTab == 0) {            var removingSM = $scope.specialMembers.filter(function (i) {                return i[2];            });            $scope.specialMembers = $scope.specialMembers.filter(function (i) {                return !i[2];            });            for (i = 0; i < removingSM.length; i++) {                if (removingSM[i][2]) {                    data = $.param({eid: removingSM[i][0], gid: SelectedGroup.id});                    $http.post('/private/operations/remove_sm.php', data, config)                        .success(function (data) {                                if (data.t == "e") {                                    new Message('Error', data.r, MESSAGE_DANGER).show();                                }                            }                        );                }            }        } else if ($scope.currentTab == 1) {            var removingM = $scope.members.filter(function (i) {                return i[2];            });            $scope.members = $scope.members.filter(function (i) {                return !i[2];            });            for (i = 0; i < removingM.length; i++) {                if (removingM[i][2]) {                    data = $.param({eid: removingM[i][0], gid: SelectedGroup.id});                    $http.post('/private/operations/remove_m.php', data, config)                        .success(function (data) {                                if (data.t == "e") {                                    new Message('Error', data.r, MESSAGE_DANGER).show();                                }                            }                        );                }            }        } else {            var removingTypes = $scope.questionTypes.filter(function (i) {                return i[2];            });            $scope.questionTypes = $scope.questionTypes.filter(function (i) {                return !i[2];            });            for (i = 0; i < removingTypes.length; i++) {                if (removingTypes[i][2]) {                    data = $.param({qid: removingTypes[i][0], gid: SelectedGroup.id});                    $http.post('/private/operations/remove_qt.php', data, config)                        .success(function (data) {                                if (data.t == "e") {                                    new Message('Error', data.r, MESSAGE_DANGER).show();                                }                            }                        );                }            }        }    };    $scope.deleteGroup = function () {        var data = $.param({            gid: SelectedGroup.id,        });        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/delete_group.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        window.location = '/home';                    } else {                        new Message('Error', data.r, MESSAGE_DANGER).show();                    }                }            );    };    $scope.setMembersList = function () {        console.log("Calling Members");        $scope.members = [];        $scope.specialMembers = [];        $scope.questionTypes = [];        $scope.ranks = [];        var data = $.param({gid: SelectedGroup.id});        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/get_all_sm.php', data, config)            .success(function (data) {                    for (i = 0; i < data.r.length; i++) {                        if (SelectedGroup.type == 1) {                            $scope.specialMembers[$scope.specialMembers.length] = [data.r[i][0], data.r[i][1], false];                        } else {                            $scope.specialMembers[$scope.specialMembers.length] = [data.r[i][0], data.r[i][1]];                        }                    }                }            );        $http.post('/private/operations/get_all_m.php', data, config)            .success(function (data) {                    for (i = 0; i < data.r.length; i++) {                        if (SelectedGroup.type == 1 || SelectedGroup.type == 2) {                            $scope.members[$scope.members.length] = [data.r[i][0], data.r[i][1], false];                        } else {                            $scope.members[$scope.members.length] = [data.r[i][0], data.r[i][1]];                        }                    }                }            );        $http.post('/private/operations/get_admin.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        $scope.admin = data.r;                        if (SelectedGroup.type == 1) {                            $scope.admin[1] = "You";                        }                    } else {                        $scope.admin = "";                    }                }            );        $http.post('/private/operations/get_toppers_list.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        $scope.ranks = data.r;                        console.log("Ranks: " + data.r);                    }                }            );        // Add question types list for admin        if (SelectedGroup.type == 1) {            $http.post('/private/operations/get_all_qt.php', data, config)                .success(function (data) {                        if (data.t == "s") {                            for (i = 0; i < data.r.length; i++) {                                $scope.questionTypes[$scope.questionTypes.length] = [data.r[i][0], data.r[i][1], false];                            }                        } else {                            new Message('Error', data.r, MESSAGE_DANGER).show();                        }                    }                );        }        $scope.groupName = SelectedGroup.name;    };    $rootScope.$on("CallSetMembersList", function () {        $scope.setMembersList();    });}]);/** * Used to dynamically load all the data from server and arrange it on the page */mainApp.controller("MainAppController", ['$scope', '$http', 'SelectedGroup', '$rootScope', '$compile', function ($scope, $http, SelectedGroup, $rootScope, $compile) {    $scope.GroupList = [];    $scope.GroupList.admins = [];    $scope.GroupList.specialMembers = [];    $scope.GroupList.members = [];    $scope.questions = [];    $scope.answers = [];    $scope.currentTab = 0;    $scope.showQCommentBoxFlag = false;    $scope.qComment = null;    $scope.questionLikes = 0;    $scope.answerLikes = 0;    $scope.next=false;    $scope.previous=false;    $scope.AprofilePic='';    $http.get('/private/operations/get_all_admin_groups.php')        .success(function (data) {                $scope.GroupList.admins = data.r;                $scope.profilePic=globalPath;            }        );    $http.get('/private/operations/get_all_sm_groups.php')        .success(function (data) {                $scope.GroupList.specialMembers = data.r;            }        );    $http.get('/private/operations/get_all_m_groups.php')        .success(function (data) {                $scope.GroupList.members = data.r;            }        );    function loadAllQuestionTypes(groupId) {        var data = $.param({gid: groupId});        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/get_all_qt.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        SelectedGroup.questionTypes = data.r;                    }                }            );    }    $scope.getQTName = function (typeId) {        for (i = 0; i < SelectedGroup.questionTypes.length; i++) {            if (SelectedGroup.questionTypes[i][0] == typeId) {                return SelectedGroup.questionTypes[i][1];            }        }    };    /**     * Switches one group to another     * @param groupId Unique id of group     * @param groupType Type of group 1 for Admin, 2 for special and 3 for member     */    $scope.changeGroup = function (groupId, groupType) {        $scope.currentTab = 0;        $scope.previous=false;        $scope.next=false;        if (SelectedGroup.id == groupId) {            /*  Group is already selected  */            return;        }        $('#gh-' + SelectedGroup.id).removeClass('active');        $('#gh-' + groupId).addClass('active');        $('#gc-' + SelectedGroup.id).hide();        loadAllQuestionTypes(groupId);        /* gc : groupContent */        var data = $.param({gid: groupId});        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        var result = angular.fromJson(localStorage.getItem("gc" + groupId));        if (result !== null) {            $scope.questions = result;        } else {            $http.post('/private/operations/get_group_questions.php', data, config)                .success(function (data) {                        if (data.t === "s") {                            localStorage.setItem("gc" + groupId, angular.toJson(data.r));                            $scope.questions = angular.fromJson(localStorage.getItem("gc" + groupId));                        } else {                            new Message('Error', data.r, MESSAGE_DANGER).show();                        }                    }                );        }        SelectedGroup.id = groupId;        SelectedGroup.type = groupType;        if (groupType == 1) {            angular.forEach($scope.GroupList.admins, function (v, k) {                if (v[0] == groupId)                    SelectedGroup.name = v[1];            });        } else if (groupType == 2) {            angular.forEach($scope.GroupList.specialMembers, function (v, k) {                if (v[0] == groupId)                    SelectedGroup.name = v[1];            });        } else {            angular.forEach($scope.GroupList.members, function (i, v) {                if (v[0] == groupId)                    SelectedGroup.name = v[1];            });        }        $http.post('/private/operations/get_group_score.php', data, config)            .success(function (data) {                    if (data.t === "s") {                        $scope.questionLikes = data.r[0];                        $scope.answerLikes = data.r[1];                    }                }            );    };    /**     * Refresh the content of current selected group     */    $scope.refreshGroup = function () {        if ($scope.currentTab == 0) {            var data = $.param({gid: SelectedGroup.id});            var config = {                headers: {                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'                }            };            $http.post('/private/operations/get_group_questions.php', data, config)                .success(function (data) {                        if (data.t === "s") {                            localStorage.setItem("gc" + SelectedGroup.id, angular.toJson(data.r));                            $scope.questions = angular.fromJson(localStorage.getItem("gc" + SelectedGroup.id));                        } else {                            new Message('Error', data.r, MESSAGE_DANGER).show();                        }                    }                );        } else {            $scope.showAnswers($scope.currentSelectedQuest);            $scope.previous=true;        }    };    $scope.showAnswers = function (questId) {        if (questId != null) {            $scope.currentSelectedQuest = questId;            var data = $.param({qid: questId});            var config = {                headers: {                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'                }            };            $http.post('/private/operations/get_a.php', data, config)                .success(function (data) {                        if (data.t === "s") {                            $scope.answers = data.r;                            console.log(data.r);                            $scope.applyLikesStyle();                        }                    }                );        }        $scope.currentTab = 1;        $scope.previous=true;    };    $scope.openQCommentBox = function (qId) {        openQCommentBox(qId);        $compile($('#qcomment' + qId))($scope);    };    $scope.openACommentBox = function (qId) {        openACommentBox(qId);        $compile($('#acomment' + qId))($scope);    };    $scope.openSolutionBox = function (qId) {        openSolutionBox(qId);        $compile($('#soln' + qId))($scope);    };    $scope.showQuestions = function () {        $scope.next=true;        $scope.currentTab = 0;    };    $scope.isGroupSelected = function () {        return SelectedGroup.type != 0;    };    $scope.isNavigated = function () {        return $scope.previous;    };    $scope.isBacked = function () {        return $scope.next;    };    $scope.applyLikesStyle = function () {        $(function () {            var objects = $('.qframe>.stars');            objects.each(function () {                $(this).combostars({selected: $(this).data('oldlikes')});            });            objects.on('change', function () {                var data = $.param({                    id: $(this).data('id'),                    likes: $(this).val()                });                var config = {                    headers: {                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'                    }                };                if ($(this).data('type') == 'q') {                    $http.post('/private/operations/set_q_rank.php', data, config);                } else {                    $http.post('/private/operations/set_a_rank.php', data, config);                }            });        });    };    $scope.sendLikes = function (post, type, e) {        var elem = angular.element(e.srcElement);        //console.log(elem);    };    $scope.sendQComment = function (qId) {        var data = $.param({            qid: qId,            comment: $('#qcomment' + qId).find('.editable').html()        });        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/add_q_comment.php', data, config)            .success(function (data) {                    if (data.t === "s") {                        $('#qcomment' + qId).remove();                        $scope.refreshGroup();                    } else {                        //console.log("error");                    }                }            );    };    $scope.sendAComment = function (aId) {        var data = $.param({            aid: aId,            comment: $('#acomment' + aId).find('.editable').html()        });        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/add_a_comment.php', data, config)            .success(function (data) {                    if (data.t === "s") {                        $('#acomment' + aId).remove();                        $scope.refreshGroup();                    } else {                        //console.log("error");                    }                }            );    };    $scope.sendSolution = function (qId) {        var data = $.param({            qid: qId,            soln: $('#soln' + qId).find('.editable').html()        });        var config = {            headers: {                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'            }        };        $http.post('/private/operations/add_solution.php', data, config)            .success(function (data) {                    if (data.t == "s") {                        $('#soln' + qId).remove();                        $scope.refreshGroup();                    } else {                        //console.log("error");                    }                }            );    };    /**     * Set the rating to question     * @param questionId Unique ID of question     */    $scope.setRating = function (questionId) {        //console.log('Setting rate to ' + questionId);    };    $scope.setQuestionTypesList = function () {        $rootScope.$emit("CallSetQuestionTypesList", {});    };    $scope.setMembersList = function () {        $rootScope.$emit("CallSetMembersList", {});    };}]);/* Closing of MainController */