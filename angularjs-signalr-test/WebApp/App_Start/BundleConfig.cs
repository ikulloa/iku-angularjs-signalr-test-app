using System.Web.Optimization;

namespace WebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/Scripts/jquery-3.3.1.js",
                "~/Scripts/jquery.signalR-2.2.3.min.js",
                "~/Scripts/jquery-ui.js",
                "~/Scripts/jquery-ui-touch-punch.js",
                "~/Scripts/angular.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/toastr.js",
                "~/Scripts/moment.js",
                "~/Scripts/ui-bootstrap-tpls-0.10.0.js",
                "~/Scripts/spin.js",
                "~/Scripts/angular-ui/sortable.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/app/app.js",
                "~/app/config.js",
                "~/app/config.exceptionHandler.js",
                "~/app/config.route.js",

                "~/app/common/common.js",
                "~/app/common/logger.js",
                "~/app/common/spinner.js",
                "~/app/common/bootstrap/bootstrap.dialog.js",
                "~/app/common/realtime.js",
                "~/app/common/notification.service.js",

                "~/app/admin/admin.js",
                "~/app/dashboard/dashboard.controller.js",
                "~/app/orders/edit-order.controller.js",
                "~/app/workschedule/work-schedule.controller.js",

                "~/app/layout/shell.js",
                "~/app/layout/sidebar.js",

                "~/app/services/datacontext.js",
                "~/app/services/directives.js"
            ));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/ie10mobile.css",
                "~/Content/bootstrap.min.css",
                "~/Content/font-awesome.min.css",
                "~/Content/toastr.css",
                "~/Content/customtheme.css",
                "~/Content/styles.css"
            ));


        }
    }
}
