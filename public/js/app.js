angular.module('amsenotes',[]).controller('NotesCtrl', function($scope, $http, $location){
    $scope.homePage = function() {
        $scope.showHome = true;
        $scope.showNotes = false;
        $scope.showAbout = false;
        $location.path('/home');
        $location.hash('');
    };

    $scope.notesPage = function() {
        $scope.showHome = false;
        $scope.showNotes = true;
        $scope.showAbout = false;
        $location.path('/notes');
    };

    $scope.aboutPage = function() {
        $scope.showHome = false;
        $scope.showNotes = false;
        $scope.showAbout = true;
        $location.path('/about');
        $location.hash('');
    };

    $scope.currentTab = 'AP US History II';
    $scope.clickTab = function(subject) {
        $scope.currentTab = subject;
        $location.hash(subject);
    }

    var page = $location.path();
    if (page == '/home') {
        $scope.homePage();
    }else if (page == '/notes') {
        $scope.notesPage();
        if ($location.hash()) {
            $scope.clickTab($location.hash());
        }
    }else if (page =='/about') {
        $scope.aboutPage()
    }else{
        $scope.homePage();
    }

    $scope.subjects = ['AP US History II', 'Academy Biology', 'Calculus BC', 'Hindi', 'Organic Chemistry', 'US History Honors'];
    $scope.notes = {};
    $scope.subjects.forEach(function(subject) {
        var url = 'https://api.github.com/repos/amsenotes/notes/contents/'+encodeURIComponent(subject) + '?callback=JSON_CALLBACK';
        $http.jsonp(url).success(function(data) {
            var re = /(?:\.([^.]+))?$/;
            $scope.notes[subject] = data.data;
            $scope.notes[subject].forEach(function(note) {
                note.type = re.exec(note.name)[1];
                note.typeIcon = note.type=='pdf'                    ? 'fa-file-pdf-o'       :
                                note.type=='doc'||note.type=='docx' ? 'fa-file-word-o'      :
                                note.type=='xls'||note.type=='xlsx' ? 'fa-file-excel-o'     :
                                note.type=='ppt'||note.type=='pptx' ? 'fa-file-powerpoint-o':
                                                                      'fa-file-o'           ;
                note.download = 'https://github.com/amsenotes/notes/raw/master/' + note.path;
                note.view = 'http://docs.google.com/viewer?url=' + note.download;
            });
        });
    });
});

/*\
 * Just some notes on some things:
 * files = $http.jsonp(encodeURIComponent('https://api.github.com/repos/amsenotes/notes/contents/'+FOLDER_NAME),{});
 * raw file: 'https://github.com/amsenotes/notes/raw/master/' + file.path
 * google drive viewer = 'http://docs.google.com/viewer?url=' + raw file link
\*/

