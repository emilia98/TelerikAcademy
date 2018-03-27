using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenerateStrings
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();
            List<string> stringified = new List<string>();

            while(input != "stop")
            {
                stringified.Add($"'{input}',");
                input = Console.ReadLine();
            }

            Console.WriteLine(String.Join("\n", stringified));
        }
    }
}
