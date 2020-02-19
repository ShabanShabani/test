//
//  storySlider.swift
//  MapsDirection
//
//  Created by Shahs Hdurb on 4/25/19.
//  Copyright © 2019 balitax. All rights reserved.
//

import UIKit
import Alamofire
import GoogleMaps
import CoreLocation

class storySlider: UIViewController, UIScrollViewDelegate, CLLocationManagerDelegate{
    
    
    var slides: [Slide] = []
    @IBOutlet weak var pageControl: UIPageControl!
    @IBOutlet weak var storyScrollView: UIScrollView!
    var DeviceIdOfStory: String = ""
    var objStoryOfDevice = [storyOfDeviceRoot]()
    var offSet: CGFloat = 0
    let viewC = ViewController()
    let locationManager = CLLocationManager()
    var latOfStory: String = ""
    var lngOfStory: String = ""
    
    var coordinateOfDevice = CLLocationCoordinate2D()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.offSet = 0
        let timer = Timer.scheduledTimer(timeInterval: 3, target: self, selector: #selector(autoScroll), userInfo: nil, repeats: true)
        view.bringSubview(toFront: pageControl)
        initializeTheLocationManager()
        getStoryForCurrentDevice()
        
        
        
    }
    func initializeTheLocationManager() {
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        
        locationManager.startMonitoringSignificantLocationChanges()
        
        
        
    }
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let locValue: CLLocationCoordinate2D = manager.location?.coordinate else { return }
        //print("locations = \(locValue.latitude) \(locValue.longitude)")
        coordinateOfDevice.latitude = (manager.location?.coordinate.latitude)!
        coordinateOfDevice.longitude = (manager.location?.coordinate.longitude)!
        
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        setupSlideScrollView(slides: slides)
    }
    
    @objc func autoScroll() {
        let totalPossibleOffset = CGFloat(slides.count - 1) * self.view.bounds.size.width
        if offSet == totalPossibleOffset {
            offSet = 0 // come back to the first image after the last image
        }
        else {
            offSet += self.view.bounds.size.width
        }
        DispatchQueue.main.async() {
            UIView.animate(withDuration: 0.3, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: {
                self.storyScrollView.contentOffset.x = CGFloat(self.offSet)
            }, completion: nil)
        }
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let page = scrollView.contentOffset.x / scrollView.frame.size.width
        pageControl.currentPage = Int(page)
        self.offSet = page * scrollView.frame.size.width // this updates offset value so that automatic scroll begins from the image you arrived at manually
    }
    
    func getStoryForCurrentDevice()
    {
        print(DeviceIdOfStory)
        Alamofire.request("http://10.0.0.29:8088/api/story/GetStoryByDevice?deviceId=\(DeviceIdOfStory)", method: .get, parameters: nil, encoding: JSONEncoding.default, headers: nil).responseString {
            response in
            do{
                self.objStoryOfDevice = try JSONDecoder().decode(Array<storyOfDeviceRoot>.self, from: response.data!)
                self.slides = self.createSlides()
                self.setupSlideScrollView(slides: self.slides)
                self.storyScrollView.delegate = self
                
                self.pageControl.numberOfPages = self.slides.count
                self.pageControl.currentPage = 0
            }
            catch let error
            {
                print("errori:\(error)")
            }
        }
    }
    
    
    
    func createSlides() -> [Slide]
    {
        var arrayofSlide: [Slide] = []
        for imgInfo in self.objStoryOfDevice
        {
            let lat = imgInfo.lat
            let lng = imgInfo.lng
            let description = imgInfo.storyDescription
            let dateS = imgInfo.postDate
            let rateClient = Int(imgInfo.rateClient)
            var slide1: Slide = Bundle.main.loadNibNamed("Slide", owner: self, options: nil)?.first as! Slide
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
            let dateStory = dateFormatter.date(from:dateS!)
            let calendar = NSCalendar.current
            let date = Date()
            let difference = calendar.dateComponents([.day], from: dateStory!, to: date)
            if difference.day! < 1
            {
                let differenceinHour = calendar.dateComponents([.hour], from: dateStory!, to: date)
                if differenceinHour.hour! < 1
                {
                    let differenceinMin = calendar.dateComponents([.minute], from: dateStory!, to: date)
                    slide1.lbltime.text = "\(differenceinMin.minute!)m ago"
                    print(differenceinMin.minute)
                }
                slide1.lbltime.text = "\(differenceinHour.hour!)h ago"
            }
            else
            {
                slide1.lbltime.text = "\(difference.day!)d ago"
            }
            let coord = "\(lat!) + \(lng!)"
            let latitude = Double(lat!)
            let longitude = Double(lng!)
            let storyCoordinate = CLLocationCoordinate2D(latitude: latitude!, longitude: longitude!)
            let coordinateOfDeviceC = CLLocation(latitude: CLLocationDegrees(coordinateOfDevice.latitude), longitude: CLLocationDegrees(coordinateOfDevice.longitude))
            let storyCoordinateC = CLLocation(latitude: CLLocationDegrees(storyCoordinate.latitude), longitude: CLLocationDegrees(storyCoordinate.longitude))
            let distanceInKm = (storyCoordinateC.distance(from: coordinateOfDeviceC))/1000
            var img = Data(base64Encoded: imgInfo.storyContent , options: Data.Base64DecodingOptions.ignoreUnknownCharacters)
            slide1.lbltest.text = description
            slide1.storyImageView.image = UIImage(data: img!)
            slide1.lblDistance.text = " \(String(format:"%.2f", distanceInKm)) km"
            slide1.btnNavigateTo.addTarget(self, action: #selector(self.navigate), for: .touchUpInside)
            slide1.btnNavigateTo.accessibilityHint = coord
            slide1.btncLOSE.addTarget(self, action: #selector(self.closeSlider(_:)), for: .touchUpInside)
            var xDistance = 74
            for rate in 0..<(rateClient!)
            {
                let btnRate = UIButton(frame:CGRect(x: 0, y: 0, width: 25, height: 25))
                btnRate.frame.origin = CGPoint(x: xDistance, y: 627)
                btnRate.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
                slide1.addSubview(btnRate)
                xDistance = xDistance + 33
            }
            let lblRate = UILabel(frame: CGRect(x: 0, y: 0, width: 25, height: 25))
            lblRate.frame.origin = CGPoint(x: xDistance + 5, y: 627)
            lblRate.font = lblRate.font.withSize(15)
            lblRate.textColor = UIColor.white
            lblRate.text = "\(String(rateClient!)).0"
            slide1.addSubview(lblRate)
            arrayofSlide.append(slide1)
        }

        
        
        
        return arrayofSlide

    }
    
    @objc func closeSlider(_ sender:UIButton)
    {
        dismiss(animated: true, completion: nil)
    }
    
    @objc func navigate(_ sender:UIButton)
    {
        let coordinate = sender.accessibilityHint
        var myCoordinate = viewC.locationManager.location!.coordinate
        print(myCoordinate)
        
        performSegue(withIdentifier: "segue_navigateMap", sender: coordinate)
        
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "segue_navigateMap"
        {
            let viewcontroller = segue.destination as? ViewController
            viewcontroller?.coordinateOfStory = sender as! String
            viewcontroller?.printTest()
            
        }
    }
    
    
    
    func setupSlideScrollView(slides: [Slide])
    {
        storyScrollView.frame = CGRect(x: view.frame.width, y: 0, width: view.frame.width, height: view.frame.height)
        storyScrollView.contentSize = CGSize(width: view.frame.width * CGFloat(slides.count), height: view.frame.height)
        storyScrollView.isPagingEnabled = true
        
        for i in 0 ..< slides.count {
            slides[i].frame = CGRect(x: view.frame.width * CGFloat(i), y: 0, width: view.frame.width, height: view.frame.height)
            self.storyScrollView.addSubview(slides[i])
        }
    }
    
    
}
