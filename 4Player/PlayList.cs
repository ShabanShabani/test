using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace _4Player
{
    public class PlayList
    {
        public string name { get; set; }
        public int position { get; set; }
        public string time { get; set; }
        public bool has_continue { get; set; }
        public List<records> rec_list { get; set; }
    }
    public class records
    {
        [XmlAttribute]
        public int id { get; set; }
        public string filename { get; set; }
        public string screenId { get; set; }
    }
}
