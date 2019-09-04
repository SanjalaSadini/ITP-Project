import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
import * as Chartist from 'chartist';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
// export class AdminLayoutComponent implements OnInit {
//   private _router: Subscription;
//   private lastPoppedUrl: string;
//   private yScrollStack: number[] = [];

//   constructor( public location: Location, private router: Router) {}

//   ngOnInit() {
//       const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

//       if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
//           // if we are on windows OS we activate the perfectScrollbar function

//           document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
//       } else {
//           document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
//       }
//       const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
//       const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

//       this.location.subscribe((ev:PopStateEvent) => {
//           this.lastPoppedUrl = ev.url;
//       });
//        this.router.events.subscribe((event:any) => {
//           if (event instanceof NavigationStart) {
//              if (event.url != this.lastPoppedUrl)
//                  this.yScrollStack.push(window.scrollY);
//          } else if (event instanceof NavigationEnd) {
//              if (event.url == this.lastPoppedUrl) {
//                  this.lastPoppedUrl = undefined;
//                  window.scrollTo(0, this.yScrollStack.pop());
//              } else
//                  window.scrollTo(0, 0);
//          }
//       });
//       this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
//            elemMainPanel.scrollTop = 0;
//            elemSidebar.scrollTop = 0;
//       });
//       if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
//           let ps = new PerfectScrollbar(elemMainPanel);
//           ps = new PerfectScrollbar(elemSidebar);
//       }

//       const window_width = $(window).width();
//       let $sidebar = $('.sidebar');
//       let $sidebar_responsive = $('body > .navbar-collapse');
//       let $sidebar_img_container = $sidebar.find('.sidebar-background');


//       if(window_width > 767){
//           if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
//               $('.fixed-plugin .dropdown').addClass('open');
//           }

//       }

//       $('.fixed-plugin a').click(function(event){
//         // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
//           if($(this).hasClass('switch-trigger')){
//               if(event.stopPropagation){
//                   event.stopPropagation();
//               }
//               else if(window.event){
//                  window.event.cancelBubble = true;
//               }
//           }
//       });

//       $('.fixed-plugin .badge').click(function(){
//           let $full_page_background = $('.full-page-background');


//           $(this).siblings().removeClass('active');
//           $(this).addClass('active');

//           var new_color = $(this).data('color');

//           if($sidebar.length !== 0){
//               $sidebar.attr('data-color', new_color);
//           }

//           if($sidebar_responsive.length != 0){
//               $sidebar_responsive.attr('data-color',new_color);
//           }
//       });

//       $('.fixed-plugin .img-holder').click(function(){
//           let $full_page_background = $('.full-page-background');

//           $(this).parent('li').siblings().removeClass('active');
//           $(this).parent('li').addClass('active');


//           var new_image = $(this).find("img").attr('src');

//           if($sidebar_img_container.length !=0 ){
//               $sidebar_img_container.fadeOut('fast', function(){
//                  $sidebar_img_container.css('background-image','url("' + new_image + '")');
//                  $sidebar_img_container.fadeIn('fast');
//               });
//           }

//           if($full_page_background.length != 0){

//               $full_page_background.fadeOut('fast', function(){
//                  $full_page_background.css('background-image','url("' + new_image + '")');
//                  $full_page_background.fadeIn('fast');
//               });
//           }

//           if($sidebar_responsive.length != 0){
//               $sidebar_responsive.css('background-image','url("' + new_image + '")');
//           }
//       });
//   }
//   ngAfterViewInit() {
//       this.runOnRouteChange();
//   }
//   isMaps(path){
//       var titlee = this.location.prepareExternalUrl(this.location.path());
//       titlee = titlee.slice( 1 );
//       if(path == titlee){
//           return false;
//       }
//       else {
//           return true;
//       }
//   }
//   runOnRouteChange(): void {
//     if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
//       const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
//       const ps = new PerfectScrollbar(elemMainPanel);
//       ps.update();
//     }
//   }
//   isMac(): boolean {
//       let bool = false;
//       if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
//           bool = true;
//       }
//       return bool;
//   }

// }

export class AdminLayoutComponent implements OnInit {

    constructor() { }
    startAnimationForLineChart(chart){
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;
  
        chart.on('draw', function(data) {
          if(data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          } else if(data.type === 'point') {
                seq++;
                data.element.animate({
                  opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                });
            }
        });
  
        seq = 0;
    };
    startAnimationForBarChart(chart){
        let seq2: any, delays2: any, durations2: any;
  
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function(data) {
          if(data.type === 'bar'){
              seq2++;
              data.element.animate({
                opacity: {
                  begin: seq2 * delays2,
                  dur: durations2,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
        });
  
        seq2 = 0;
    };
    ngOnInit() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
  
        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };
  
       const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
        }
  
        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
  
        this.startAnimationForLineChart(dailySalesChart);
  
  
        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
  
        const dataCompletedTasksChart: any = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };
  
       const optionsCompletedTasksChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
        }
  
        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
  
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);
  
  
  
        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
  
        var datawebsiteViewsChart = {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
  
          ]
        };
        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
        };
        var responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
        var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
  
        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
    }
  
  }
