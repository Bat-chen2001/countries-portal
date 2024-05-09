using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using log4net;
using log4net.Config;

namespace Repository.Utils
{
    public class Logs
    {
        private static readonly ILog log=LogManager.GetLogger(typeof(Logs));

        public static void printInfoLogs(string infoMassege) 
        {
            XmlConfigurator.Configure(new FileInfo("LoggerConfig.xml"));
            log.Info(infoMassege);
        }

        public static void printErrorLogs(string ErrorMassege)
        {
            XmlConfigurator.Configure(new FileInfo("LoggerConfig.xml"));
            log.Error(ErrorMassege);
        }

    }
}
