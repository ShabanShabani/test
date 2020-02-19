using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace _4Player
{


    public partial class Player : Form
    {
        PlayList _pl;        
        Size ScreenSize = new Size(2304, 1056);
        Point DisplayStartPoint = new Point(1600, 0);        
        List<BlendPanel> lsp = new List<BlendPanel>();

        static bool enableStrech = true;

        BlendPanel V1 = new BlendPanel(enableStrech);
        BlendPanel V2 = new BlendPanel(enableStrech);
        BlendPanel V3 = new BlendPanel(enableStrech);
        BlendPanel V4 = new BlendPanel(enableStrech);
        BlendPanel V5 = new BlendPanel(enableStrech);
        BlendPanel V6 = new BlendPanel(enableStrech);

        BlendPanel L1 = new BlendPanel(enableStrech);
        BlendPanel L2 = new BlendPanel(enableStrech);
        BlendPanel L3 = new BlendPanel(enableStrech);
        BlendPanel L4 = new BlendPanel(enableStrech);
        BlendPanel L5 = new BlendPanel(enableStrech);
        BlendPanel L6 = new BlendPanel(enableStrech);
        BlendPanel L7 = new BlendPanel(enableStrech);
        BlendPanel L8 = new BlendPanel(enableStrech);
        BlendPanel L9 = new BlendPanel(enableStrech);

        BlendPanel J1 = new BlendPanel(enableStrech);
        BlendPanel J2 = new BlendPanel(enableStrech);
        BlendPanel J3 = new BlendPanel(enableStrech);
        BlendPanel J4 = new BlendPanel(enableStrech);
        BlendPanel J5 = new BlendPanel(enableStrech);
        BlendPanel J6 = new BlendPanel(enableStrech);



        public int counter = 0;
        private List<Tuple<BlendPanel, List<records>>> pbox_playList = new List<Tuple<BlendPanel, List<records>>>();
        _4CController _parentForm;

        public Player(PlayList pl, _4CController parentForm)
        {
            _parentForm = parentForm;
            InitializeComponent();
            
            showOnScreen(this, DisplayStartPoint, ScreenSize);                     
            _pl = pl;
        }

        public void startTimers()
        {
            timer_15s.Interval = 1;
            timer_15s.Start();

        }
        public void positionControls()
        {
            V1.Location = new Point(0, 0);
            V1.Width = 1056;
            V1.Height = 96;
            V1.BackColor = Color.Black;
            V1.Name = "V1";


            V2.Location = new Point(1056, 0);
            V2.Width = 1056;
            V2.Height = 96;
            V2.BackColor = Color.Black;
            V2.Name = "V2";

            V3.Location = new Point(0, 96);
            V3.Width = 1056;
            V3.Height = 96;
            V3.BackColor = Color.Black;
            V3.Name = "V3";

            V4.Location = new Point(1056, 96);
            V4.Width = 1056;
            V4.Height = 96;
            V4.BackColor = Color.Black;
            V4.Name = "V4";

            V5.Location = new Point(0, 192);
            V5.Width = 1056;
            V5.Height = 96;
            V5.BackColor = Color.Black;
            V5.Name = "V5";

            V6.Location = new Point(1056, 192);
            V6.Width = 1056;
            V6.Height = 96;
            V6.BackColor = Color.Black;
            V6.Name = "V6";


            L1.Location = new Point(0, 288);
            L1.Width = 1152;
            L1.Height = 96;
            L1.BackColor = Color.Black;
            L1.Name = "L3";

            L2.Location = new Point(1152, 288);
            L2.Width = 1152;
            L2.Height = 96;
            L2.BackColor = Color.Black;
            L2.Name = "L4";

            L3.Location = new Point(0, 384);
            L3.Width = 1152;
            L3.Height = 96;
            L3.BackColor = Color.Black;
            L3.Name = "L1";

            L4.Location = new Point(1152, 384);
            L4.Width = 1152;
            L4.Height = 96;
            L4.BackColor = Color.Black;
            L4.Name = "L2";

            L5.Location = new Point(0, 480);
            L5.Width = 2112;
            L5.Height = 96;
            L5.Name = "UEFA";
            L5.Name = "L5";

            L6.Location = new Point(0, 576);
            L6.Width = 1152;
            L6.Height = 96;
            L6.BackColor = Color.Black;
            L6.Name = "L8";

            L7.Location = new Point(1152, 576);
            L7.Width = 1152;
            L7.Height = 96;
            L7.BackColor = Color.Black;
            L7.Name = "L9";

            L8.Location = new Point(0, 672);
            L8.Width = 1152;
            L8.Height = 96;
            L8.BackColor = Color.Black;
            L8.Name = "L6";

            L9.Location = new Point(1152, 672);
            L9.Width = 1152;
            L9.Height = 96;
            L9.BackColor = Color.Black;
            L9.Name = "L7";


            J1.Location = new Point(0, 768);
            J1.Width = 1056;
            J1.Height = 96;
            J1.BackColor = Color.Black;
            J1.Name = "J5";

            J2.Location = new Point(1056, 768);
            J2.Width = 1056;
            J2.Height = 96;
            J2.BackColor = Color.Black;
            J2.Name = "J6";

            J3.Location = new Point(0, 864);
            J3.Width = 1056;
            J3.Height = 96;
            J3.BackColor = Color.Black;
            J3.Name = "J3";

            J4.Location = new Point(1056, 864);
            J4.Width = 1056;
            J4.Height = 96;
            J4.BackColor = Color.Black;
            J4.Name = "J4";

            J5.Location = new Point(0, 960);
            J5.Width = 1056;
            J5.Height = 96;
            J5.BackColor = Color.Black;
            J5.Name = "J1";

            J6.Location = new Point(1056, 960);
            J6.Width = 1056;
            J6.Height = 96;
            J6.BackColor = Color.Black;
            J6.Name = "J2";
        }
        static void showOnScreen(Form frm, Point p, Size s)
        {
            Screen[] screens = Screen.AllScreens;

            frm.Location = p;
            frm.ClientSize = s;

        }

        private void timer1_Tick(object sender, EventArgs e)
        {

            foreach (BlendPanel pictureBox in lsp)
            {
                changeMedia(pictureBox);
            }
            _pl.position++;
            timer_15s.Interval = 15000;            
        }

        public void changePlayList(PlayList new_pl)
        {            
            lsp.Clear();
            lsp.Add(V1);
            lsp.Add(V2);
            lsp.Add(V3);
            lsp.Add(V4);
            lsp.Add(V5);
            lsp.Add(V6);
            lsp.Add(L1);
            lsp.Add(L2);
            lsp.Add(L3);
            lsp.Add(L4);
            lsp.Add(L5);
            lsp.Add(L6);
            lsp.Add(L7);
            lsp.Add(L8);
            lsp.Add(L9);
            lsp.Add(J1);
            lsp.Add(J2);
            lsp.Add(J3);
            lsp.Add(J4);
            lsp.Add(J5);
            lsp.Add(J6);

            positionControls();

            if (new_pl == null)
            {
                timer_15s.Stop();
                foreach (BlendPanel pb in lsp)
                {
                    pb.filename = "";
                    pb.Image1 = null;
                    pb.Image2 = null;                    
                }
                logger("stop");
                return;
            }           
            _pl = new_pl;
            pbox_playList = new List<Tuple<BlendPanel, List<records>>>();

            //get names of players on the playlist
            List<string> playerList = _pl.rec_list.GroupBy(q => q.screenId).Select(x => x.Key).ToList<string>();

            //temporary list of players that exist in playlist
            List<BlendPanel> _lsp = new List<BlendPanel>();

            //fill temporary list of players with playlist players
            foreach (string s in playerList)
            {
                _lsp.Add(lsp.Where(q => q.Name == s).Single());
            }

            //fill the pbox_playlist with players and records
            foreach (BlendPanel pb in _lsp)
            {
                pbox_playList.Add(new Tuple<BlendPanel, List<records>>(pb, _pl.rec_list.Where(q => q.screenId == pb.Name).OrderBy(k => k.id).ToList()));
            }
            //reassign the list of player after filters
            lsp = _lsp;
            startTimers();
        }

        protected override void OnClosing(CancelEventArgs e)
        {
            
        }
        private void changeMedia(BlendPanel pictureBox)
        {
            //get all the records that match the player.
            List<records> l_records = pbox_playList.Where(q => q.Item1.Name == pictureBox.Name).Select(q => q.Item2).SingleOrDefault();

            //check if counter has reached the end of medias, if true start from begining -- loop
            if (_pl.position == l_records.Count) _pl.position = 0;

            //get file in order
            string filename = l_records[_pl.position].filename;
            if (filename != null)
            {
                try
                {
                    if (pictureBox.filename != filename)
                    {
                        if (filename.Split('.')[1] == "gif")
                        {
                            pictureBox.Image = null;
                            pictureBox.Image = Image.FromFile(filename);
                            pictureBox.filename = filename;
                            // pictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                        }
                        else
                        {
                            pictureBox.Image = null;
                            switchImage(Image.FromFile(filename), pictureBox, filename);
                            pictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                            pictureBox.filename = filename;
                        }
                    }
                    logger(filename + "," + pictureBox.Name + "," + _pl.position + "," + _parentForm.getTime(_pl.name));
                }
                catch (Exception e)
                {
                    errorlogger("Error opening file " + filename);
                }
            }
        }

        private static readonly Random random = new Random();
        private static readonly object syncLock = new object();
        public static int RandomNumber(int min, int max)
        {
            lock (syncLock)
            {
                return random.Next(min, max);
            }
        }

        private void Player_Load(object sender, EventArgs e)
        {

            Controls.Add(V1);
            Controls.Add(V2);
            Controls.Add(V3);
            Controls.Add(V4);
            Controls.Add(V5);
            Controls.Add(V6);
            Controls.Add(L1);
            Controls.Add(L2);
            Controls.Add(L3);
            Controls.Add(L4);
            Controls.Add(L5);
            Controls.Add(L6);
            Controls.Add(L7);
            Controls.Add(L8);
            Controls.Add(L9);
            Controls.Add(J1);
            Controls.Add(J2);
            Controls.Add(J3);
            Controls.Add(J4);
            Controls.Add(J5);
            Controls.Add(J6);

        }       

        private void switchImage(Image new_image, BlendPanel blendPanel, String filename)
        {
            Timer timer = new Timer();
            blendPanel.filename = filename;
            blendPanel.Image1 = blendPanel.Image2;
            blendPanel.Image2 = new_image;

            timer.Interval = 50;
            timer.Tick += blendPanel.BlendTick;
            timer.Start();

        }

        public void logger(string message)
        {
            try
            {               
                using (System.IO.StreamWriter file =
                   new System.IO.StreamWriter(_pl.name+".log", true))
                {
                    file.WriteLine(DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss") + "," + message);
                }
            }
            catch (Exception ec)
            {

                using (EventLog eventLog = new EventLog("Application"))
                {
                    eventLog.Source = "Logger";
                    eventLog.WriteEntry(message.ToString(), EventLogEntryType.Error, 101, 1);
                }
            }
            
        }

        public void errorlogger(string message)
        {
            try
            {
                using (System.IO.StreamWriter file =
                   new System.IO.StreamWriter(_pl.name + "_error.log", true))
                {
                    file.WriteLine(DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss") + "," + message);
                }
            }
            catch (Exception ec)
            {

                using (EventLog eventLog = new EventLog("Application"))
                {
                    eventLog.Source = "Logger";
                    eventLog.WriteEntry(message.ToString(), EventLogEntryType.Error, 101, 1);
                }
            }

        }
    }
}
