using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Windows.Forms;

public class BlendPanel : PictureBox
{
    private Image mImg1;
    private Image mImg2;
    private float mBlend;    
    private int mDir = 1;    
    public string filename;
    public BlendPanel(bool enableStrech)
    {
        SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint | ControlStyles.OptimizedDoubleBuffer, true);

        Bitmap my = new Bitmap(Height, Width); for (int i = 0; i < this.Height; i++) for (int j = 0; j < Width; j++) my.SetPixel(i, j, Color.Black);
        if(this.Image1 == null)this.Image1 = (Image)my;

        if (enableStrech) this.BackgroundImageLayout = ImageLayout.Stretch;
        //latestImage = (Image)my;
    }
    public Image Image1
    {
        get { return mImg1; }
        set { mImg1 = value; Invalidate(); }
    }
    public Image Image2
    {
        get { return mImg2; }
        set { mImg2 = value; Invalidate(); }
    }
    public float Blend
    {
        get { return mBlend; }
        set { mBlend = value; Invalidate(); }
    }
    public void BlendTick(object sender, EventArgs e)
    {
        Timer timer = (Timer)sender;
        mBlend += mDir * 0.40F;
        if (mBlend > 1)
        {
            try
            {
                mBlend = 0.0F;
                timer.Stop();
                timer.Tick -= BlendTick;

                this.Image1 = (Image)this.Image2.Clone();
            }
            catch (Exception) { }
        }
        this.Blend = mBlend;

    }


    protected override void OnPaint(PaintEventArgs e)
    {
        if (mImg1 == null || mImg2 == null)
            e.Graphics.FillRectangle(new SolidBrush(this.BackColor), new Rectangle(0, 0, this.Width, this.Height));
        else
        {
            Rectangle rc = new Rectangle(0, 0, this.Width, this.Height);
            ColorMatrix cm = new ColorMatrix();
            ImageAttributes ia = new ImageAttributes();
            cm.Matrix33 = mBlend;
            ia.SetColorMatrix(cm);
            e.Graphics.DrawImage(mImg2, rc, 0, 0, mImg2.Width, mImg2.Height, GraphicsUnit.Pixel, ia);
            cm.Matrix33 = 1F - mBlend;
            ia.SetColorMatrix(cm);
            e.Graphics.DrawImage(mImg1, rc, 0, 0, mImg1.Width, mImg1.Height, GraphicsUnit.Pixel, ia);
        }
        base.OnPaint(e);
    }
}