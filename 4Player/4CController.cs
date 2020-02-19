using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;
using System.Xml.Serialization;

namespace _4Player
{
    public partial class _4CController : Form        
    {
        Player p;
        List<PlayList> lst_playlist = new List<PlayList>();        
        Label current_play_time;
        DateTime start_time;
        PlayList playing_p;
        

        public string getTime(string playlistName)
        {
            return ((Label)grpPlayers.Controls.Find("time_" + playlistName, true).SingleOrDefault()).Text;
        }

        public _4CController()
        {
            InitializeComponent();

            PictureBox pbpreview1 = new PictureBox();

        Screen[] screens = Screen.AllScreens;
            Rectangle bounds = screens[1].Bounds;// new Rectangle(new Point(0,0),screens[1].Bounds); ;

            float proportion = (float)bounds.Width / bounds.Height;

            pbpreview1.Location = new System.Drawing.Point(672, 344);
            pbpreview1.Name = "pbpreview";
            pbpreview1.BackColor = Color.Violet;

            pbpreview.SizeMode = PictureBoxSizeMode.StretchImage;
            
            pbpreview.Size = new Size((int)(400* proportion), 400);
            this.Controls.Add(pbpreview1);
            timer1.Start();
           

        }
        private void DisplayScreen(ImageFormat format)
        {
            Screen[] screens = Screen.AllScreens;

            Rectangle bounds = screens[1].Bounds;// new Rectangle(new Point(0,0),screens[1].Bounds); ;

            

            using (Bitmap bitmap = new Bitmap(bounds.Width, bounds.Height))
            {
                using (Graphics g = Graphics.FromImage(bitmap))
                {
                    g.CopyFromScreen(new Point(1920, 0), new Point(0, 0), bounds.Size/*new Size(2304,1056)*/);
                }

                using (MemoryStream ms = new MemoryStream())
                {
                                        
            
                    bitmap.Save(ms, ImageFormat.Jpeg);
                    pbpreview.Image = Image.FromStream(ms);
                    
                }
            }
        }

        public void addPlayList(PlayList p)
        {
            GroupBox grp = new GroupBox();
            grp.Name = p.name ;
            grp.Size = new System.Drawing.Size(640, 57);
            

            //Label l = new Label();
            Label l1 = new Label();
            Label l2 = new Label();
            Button bplay = new Button();
            //Button bdel = new Button();
            Button bcont = new Button();

            l1.AutoSize = true;
            l1.Font = new System.Drawing.Font("Times New Roman", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            
            l1.Name = "l1"+ p.name;
            l1.Size = new System.Drawing.Size(70, 21);
            l1.TabIndex = 4;
            l1.Text = p.name;



            l2.AutoSize = true;
            l2.Font = new System.Drawing.Font("Times New Roman", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));

            l2.Name = "time_" + p.name;
            l2.Size = new System.Drawing.Size(70, 21);
            l2.TabIndex = 4;
            if (!p.has_continue)
            {
                l2.Text = "00:00:00";
            }
            else
            {
                l2.Text = p.time;
            }


            bplay.Name = "b" + p.name;
            bplay.Size = new System.Drawing.Size(89, 45);
            bplay.TabIndex = 3;
            bplay.Text = "Play";
            bplay.UseVisualStyleBackColor = true;
            bplay.BackColor = Color.Green;
            bplay.Click += btnPlay_Click;
            bplay.Tag = p.name;

            //bdel.Name = "d" + p.name;
            //bdel.Size = new System.Drawing.Size(60, 45);
            //bdel.TabIndex = 3;
            ////bdel.Text = "Remove";
            //bdel.UseVisualStyleBackColor = true;
            //bdel.BackgroundImage = Image.FromFile(@"res\delete.png");
            //bdel.BackgroundImageLayout = ImageLayout.Stretch;
            ////bdel.

            //bdel.Click += Bdel_Click;
            //bdel.Tag = p.name;

            if (p.has_continue)
            {
                bcont.Name = "c" + p.name;
                bcont.Size = new System.Drawing.Size(89, 45);
                bcont.TabIndex = 3;
                bcont.Text = "Continue";
                bcont.UseVisualStyleBackColor = true;
                bcont.BackColor = Color.Green;
                bcont.Tag = p.name;
                bcont.Click += Bcont_Click;
                grp.Controls.Add(bcont);
                bcont.Location = new System.Drawing.Point(450, 8);
                
            }

           // grp.Controls.Add(bdel);
            grp.Controls.Add(l1);
            grp.Controls.Add(l2);
            grp.Controls.Add(bplay);
            bplay.Location = new System.Drawing.Point(540, 8);
            l1.Location = new System.Drawing.Point(20, 17);
            l2.Location = new System.Drawing.Point(330, 17);
          //  bdel.Location = new System.Drawing.Point(2, 6);
            
            grpPlayers.Controls.Add(grp);
            grp.Location = new Point(6, ((grpPlayers.Controls.Count -1) * 50) + 19);
        }

        private void Bcont_Click(object sender, EventArgs e)
        {
            Button curr_button = ((Button)sender);
            string plname = curr_button.Tag.ToString();

            Control play_control = grpPlayers.Controls.Find("b" + plname, true).SingleOrDefault();


            if (playing_p != null)
            {
                p.changePlayList(null);

                Button bcont = new Button();
                bcont.Name = "c" + playing_p.name;
                bcont.Size = new System.Drawing.Size(89, 45);
                bcont.TabIndex = 3;
                bcont.Text = "Continue";
                bcont.UseVisualStyleBackColor = true;
                bcont.BackColor = Color.Green;
                bcont.Tag = playing_p.name;
                bcont.Click += Bcont_Click;
                grpPlayers.Controls.Find(playing_p.name, true).SingleOrDefault().Controls.Add(bcont);
                bcont.Location = new System.Drawing.Point(450, 8);
            }


            List<GroupBox> c = grpPlayers.Controls.OfType<GroupBox>().ToList();
            foreach (Control contr in c)
            {
                Control cnt = contr.Controls.Find("b" + contr.Name, true).SingleOrDefault();
                cnt.BackColor = Color.Green;
                cnt.Text = "Play";

            }
            
            
            grpPlayers.Controls.Find(plname, true).SingleOrDefault().Controls.Remove(curr_button);
            current_play_time = (Label)grpPlayers.Controls.Find("time_" + plname, true).SingleOrDefault();
            play_control.BackColor = Color.Red;
            play_control.Text = "Stop";


            PlayList plist = lst_playlist.Where(q => q.name == plname).SingleOrDefault();


            if (p == null)
            {
                p = new Player(plist, this); p.Show();
                playing_p = plist;
                //p.counter = plist.position;
                
            }
            else
            {                
                playing_p = plist;
            }
            p.changePlayList(plist);
            //if (playing_p != null)
            //{
            var timesplit = playing_p.time.Split(':');
            double hour = Double.Parse(timesplit[0]);
            double minute = Double.Parse(timesplit[1]);
            double second = Double.Parse(timesplit[2]);            
            start_time = DateTime.Now.AddHours(-hour).AddMinutes(-minute).AddSeconds(-second);
            //}
            //start_time = DateTime.Now;
            timer_time.Start();
        }

        public void rearangeGrp()
        {

            for(int i = 0; i< grpPlayers.Controls.Count; i++)
            {
                grpPlayers.Controls[i].Location = new Point(6, (i * 50) + 19);
            }            
        }

        private void Bdel_Click(object sender, EventArgs e)
        {
            Button b = (Button)sender;
            Control parent = b.Parent;
            Button bplay = (Button)parent.Controls.Find("b" + parent.Name, true).SingleOrDefault();
            if(bplay.Text == "Stop")
            {
                bplay.PerformClick();
            }
            lst_playlist.Remove(lst_playlist.Where(q => q.name == parent.Name).SingleOrDefault());
            grpPlayers.Controls.Remove(grpPlayers.Controls.Find(parent.Name, true).SingleOrDefault());
            rearangeGrp();


        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            DisplayScreen(ImageFormat.Jpeg);
        }

        private void btnPlay_Click(object sender, EventArgs e)
        {
            
            Button curr_button = ((Button)sender);
            string plname = curr_button.Tag.ToString();
            PlayList plist = lst_playlist.Where(q => q.name == plname).SingleOrDefault();

            if (curr_button.Text == "Stop")
            {
                curr_button.BackColor = Color.Green;
                curr_button.Text = "Play";
                p.changePlayList(null);
                timer_time.Stop();
                playing_p = null;
                plist.position = 0;
                current_play_time.Text = "00:00:00";
                return;
            }


            

            Control cont_control = grpPlayers.Controls.Find("c" + plname, true).SingleOrDefault();

            grpPlayers.Controls.Find(plname, true).SingleOrDefault().Controls.Remove(cont_control);


            List<GroupBox> c = grpPlayers.Controls.OfType<GroupBox>().ToList();
            foreach (Control contr in c)
            {                
                Control cnt = contr.Controls.Find("b" + contr.Name, true).SingleOrDefault();
                cnt.BackColor = Color.Green;
                cnt.Text = "Play";

            }
            Control curr_control = grpPlayers.Controls.Find("b"+plname, true).SingleOrDefault();
            current_play_time = (Label)grpPlayers.Controls.Find("time_" + plname, true).SingleOrDefault();
            curr_control.BackColor = Color.Red;
            curr_control.Text = "Stop";


           

            
            if (p == null)
            {
                p = new Player(plist, this); p.Show();
                
            }
            if (playing_p != null)
            {
                p.changePlayList(null);

                Button bcont = new Button();
                bcont.Name = "c" + playing_p.name;
                bcont.Size = new System.Drawing.Size(89, 45);
                bcont.TabIndex = 3;
                bcont.Text = "Continue";
                bcont.UseVisualStyleBackColor = true;
                bcont.BackColor = Color.Green;
                bcont.Tag = playing_p.name;
                bcont.Click += Bcont_Click;
                grpPlayers.Controls.Find(playing_p.name, true).SingleOrDefault().Controls.Add(bcont);
                bcont.Location = new System.Drawing.Point(450, 8);
            }


            p.changePlayList(plist);
            playing_p = plist;
            start_time = DateTime.Now;
            timer_time.Start();
            
        }

        private void openToolStripMenuItem_Click(object sender, EventArgs e)
        {
            openPlayList.FileName = "";
            grpPlayers.Controls.Clear();

            if (openPlayList.ShowDialog() == DialogResult.OK)
            {
                lst_playlist.Clear();

                if(p != null) p.changePlayList(null);
                timer_time.Stop();
                playing_p = null;                                                

                XmlDocument doc = new XmlDocument();
                doc.Load(openPlayList.FileName);
                XmlNode elem = doc.GetElementsByTagName("PlayList")[0];

                XmlNodeList play_elemnt = elem.ChildNodes;
                for (int j = 0; j < play_elemnt.Count; j++)
                {
                    PlayList p = new PlayList() { name = play_elemnt[j].Name };

                    XmlNodeList records = play_elemnt[j].ChildNodes;
                    p.rec_list = new List<records>();
                    for (int k = 0; k < records.Count; k++)
                    {
                        records r = new records();
                        r.filename = records[k].Attributes["filename"].Value;
                        r.id = Int32.Parse(records[k].Attributes["id"].Value);
                        r.screenId = records[k].Attributes["screenId"].Value;
                        p.rec_list.Add(r);
                    }
                    try
                    {
                        var lastLine = File.ReadLines(p.name + ".log").Last().Split(',');
                        if (lastLine[lastLine.Length-1] != "stop")
                        {                            
                         
                           p.position = Int32.Parse(lastLine[lastLine.Length - 2]);
                           p.time = lastLine[lastLine.Length - 1];
                           p.has_continue = true;
                        }
                        else
                        {
                            p.position = 0;
                            p.time = "00:00:00:00";
                            p.has_continue = false;
                        }

                    }
                    catch(Exception)
                    {
                        p.position = 0;
                    }
                    lst_playlist.Add(p);
                }
                foreach (PlayList pls in lst_playlist)
                {
                    addPlayList(pls);
                    
                }
            }                   
        }

        private void timer_time_Tick(object sender, EventArgs e)
        {
            TimeSpan ts = (DateTime.Now - start_time);

            current_play_time.Text = ts.ToString(@"hh\:mm\:ss"); /*ts.TotalHours.ToString("00") + ":" + ts.TotalMinutes.ToString("00")+":"+ts.TotalSeconds.ToString("00") + ":" + ts.Milliseconds.ToString("0");*/
            playing_p.time = current_play_time.Text;
        }
    }
}
