angular.module('app').component('shAudio', {
        templateUrl: 'components/audio/audio.html',
        bindings: {
            songs: '=',
            play: "="
        },
        controller: ['$scope', '$window', function ($scope, $window) {
            var self = this;
            var intervalId = $window.setInterval(function () {
                if (self.play) {
                    self.secondsPlayed++;
                    if (self.currentSong.duration <= self.secondsPlayed) {
                        self.next.call(self);
                    }
                }

            }, 1000);
            $scope.$on("$destroy", function () {
                $window.clearInterval(intervalId);
            });


            this.volume = 30;
            this.secondsPlayed = 0;
            this.currentSong = this.songs.length ? this.songs[0]
                : null;
            this.next = function () {
                this.secondsPlayed = 0;
                var prev_first = this.songs.shift();
                this.songs.push(prev_first);
                this.currentSong = this.songs.length > 0 ? this.songs[0] : null;
            }
            this.prev = function () {
                this.secondsPlayed = 0;
                var prev_last = this.songs.pop();
                this.songs.unshift(prev_last);
                this.currentSong = this.songs.length > 0 ? this.songs[0] : null;
            }
            this.togglePlay = function () {
                this.play = !this.play;
            }
            this.playSong = function(name){
                // debugger;
                for(var i =0; i<self.songs.length;i++)
                {
                    if(name == self.songs[i].name)
                    {

                        self.play = true;
                        self.currentSong = self.songs[i];
                        this.secondsPlayed = 0;
                    }
                }

            }
        }]
    }
);

