//
//  ViewController.swift
//  Maps Direction
//
//  Created by Agus Cahyono on 2/9/17.
//  Copyright © 2017 balitax. All rights reserved.
//

import UIKit
import GoogleMaps
import GooglePlaces
import SwiftyJSON
import Alamofire
import Foundation
import CoreLocation




enum Location {
    case startLocation
    case destinationLocation
}

struct nearPlaces {
    var longitude: String
    var latitude: String
    init(longitude: String, latitude:String) {
        self.latitude=latitude
        self.longitude=longitude
    }
    
    
    
}
let nearPlacesMirror=Mirror(reflecting: nearPlaces.self)
var nP:[nearPlaces] = [nearPlaces]()



class CurrentLocationChange: NSObject
{
    @objc dynamic  var lastlocation = CLLocationCoordinate2D()
    
    
}



class ViewController: UIViewController , GMSMapViewDelegate ,  CLLocationManagerDelegate {
    
    @IBOutlet weak var btnAutomobile: UIButton!
    @IBOutlet weak var btnWalk: UIButton!
    @IBOutlet weak var btnBike: UIButton!
    @IBOutlet weak var toppopup: NSLayoutConstraint!
    var mode: String = "driving"
    var place: String = "hospital"
    var place1: [String] = []

    @IBOutlet weak var placeScroll: UIScrollView!
    
    @IBAction func autoClicked(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named: "rectangle4Copy7")
        {
            deactivateButtonBackground(button: btnBike)
            deactivateButtonBackground(button: btnWalk)
            self.mode = "driving"
            
            sender.setBackgroundImage(UIImage(named:
                "rectangle4Copy4"), for: .normal)
            if #available(iOS 11.0, *) {
                sender.setTitleColor(UIColor.red, for: UIControlState.normal)
            } else {
            }
        }
        
    }
    
    
    @IBAction func btnBike(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named: "rectangle4Copy7")
        {
            deactivateButtonBackground(button: btnWalk)
            deactivateButtonBackground(button: btnAutomobile)
            self.mode = "bicycling"
            let currentColor = sender.currentTitleColor
            sender.setBackgroundImage(UIImage(named:"rectangle4Copy4"), for: .normal)
            sender.setTitleColor(UIColor.red, for: UIControlState.normal)
        }
        
    }
    
    
    @IBAction func btnWalk(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named: "rectangle4Copy7")
        {
            deactivateButtonBackground(button: btnAutomobile)
            deactivateButtonBackground(button: btnBike)
            self.mode = "walking"
            let currentColor = sender.currentTitleColor
            sender.setBackgroundImage(UIImage(named:"rectangle4Copy4"), for: .normal)
            sender.setTitleColor(UIColor.red, for: UIControlState.normal)
        }
    }
    
    func deactivateButtonBackground(button: UIButton)
    {
        button.setBackgroundImage(UIImage(named:"rectangle4Copy7"), for: .normal)
        button.setTitleColor(UIColor.white, for: .normal)
    }
    
    
    
    
    @IBOutlet weak var searchIconTop: NSLayoutConstraint!
    @IBOutlet weak var googleMaps: GMSMapView!
    //@IBOutlet weak var googleMaps: GMSMapView!
    @IBOutlet weak var startLocation: UITextField!
    @IBOutlet weak var destinationLocation: UITextField!
    
    @IBOutlet weak var btnStartLocation: UIButton!
    @IBOutlet weak var btnEndLocation: UIButton!
    
    
    
    
    
    @IBOutlet weak var testLongitude: UILabel!
    @IBOutlet weak var test: UILabel!
    @IBOutlet weak var lblNextDestination: UILabel!
    
    var pathOfRoute: GMSPath!             //polyline i komplet rruges
    var currentPathOfRoute: GMSPath!      //polyline i step aktual
    var objRoutes = RootClass()
    var objPlaces = [RootClass1]()
    
    var objRoutePolyline = [RoutePolyline]()
    var coordinateOfStory: String = ""

    
    
    var locationManager = CLLocationManager()
    var locationSelected = Location.startLocation
    
    var locationStart = CLLocation()
    var locationEnd = CLLocation()
    
    @objc var newlocation=CurrentLocationChange()
    var locationObservationToken:NSKeyValueObservation?
    
    var CurrentLongandLat = CLLocationCoordinate2D()
    
    var distancekm = Double()
    
    
    
    //variabla per testim
    
    var startTestLocation = CLLocation()
    
    var endLocationOfStory = CLLocation()

    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initializeTheLocationManager();
        searchPopupview.addSubview(placeScroll)
        //view.addSubview(placeScroll)
        fillplacescroll()
        
    }
    
    
    func initializeTheLocationManager() {
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        self.googleMaps.delegate = self
        self.googleMaps.settings.myLocationButton = true
        self.googleMaps.settings.compassButton = true
        self.googleMaps.settings.zoomGestures = true
        locationManager.startMonitoringSignificantLocationChanges()
    }
    func cameraMoveToLocation(toLocation: CLLocationCoordinate2D?) {
        if toLocation != nil {
            googleMaps.camera = GMSCameraPosition.camera(withTarget: toLocation!, zoom: 15)
        }
    }
    func createMarker(titleMarker: String, iconMarker: UIImage, latitude: CLLocationDegrees, longitude: CLLocationDegrees) {
        let marker = GMSMarker()
        marker.position = CLLocationCoordinate2DMake(latitude, longitude)
        marker.title = titleMarker
        marker.icon = iconMarker
        marker.map = googleMaps
    }
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Error to get location : \(error)")
    }
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        var location = locationManager.location?.coordinate
        newlocation.lastlocation = location!
        startTestLocation = CLLocation(latitude: (location?.latitude)!, longitude: (location?.longitude)!)
        //cameraMoveToLocation(toLocation: location)
    }
    func mapView(_ mapView: GMSMapView, idleAt position: GMSCameraPosition) {
        googleMaps.isMyLocationEnabled = true
    }
    func mapView(_ mapView: GMSMapView, willMove gesture: Bool) {
        googleMaps.isMyLocationEnabled = true
        if (gesture) {
            mapView.selectedMarker = nil
        }
    }
    func mapView(_ mapView: GMSMapView, didTap marker: GMSMarker) -> Bool {
        googleMaps.isMyLocationEnabled = true
        return false
    }
    func mapView(_ mapView: GMSMapView, didTapAt coordinate: CLLocationCoordinate2D) {
        print("COORDINATE \(coordinate)") // when you tapped coordinate
    }
    func didTapMyLocationButton(for mapView: GMSMapView) -> Bool {
        googleMaps.isMyLocationEnabled = true
        googleMaps.selectedMarker = nil
        return false
    }
    
    
    func fillplacescroll()
    {
        let btnHospital = UIButton(frame: CGRect(x: 0, y: 0, width: 106, height: 30))
        btnHospital.frame.origin = CGPoint(x: 22, y: 0)
        btnHospital.setImage(UIImage(named: "hospital"), for: .normal)
        btnHospital.setBackgroundImage(UIImage(named:"rectangle4Copy5"), for: .normal)
        btnHospital.setTitle("Hospital", for: .normal)
        btnHospital.addTarget(self, action: #selector(self.changePlace(_:)), for: UIControlEvents.touchUpInside)
        btnHospital.accessibilityHint = "hospital"
        btnHospital.setTitleColor(UIColor.white, for: .normal)
        btnHospital.titleLabel?.font = UIFont(name: "Kailasa", size: 14)
        btnHospital.titleEdgeInsets = UIEdgeInsetsMake(0, 4, 0, 0)
        btnHospital.imageEdgeInsets = UIEdgeInsetsMake(0, -12, 0, 0)
        btnHospital.clipsToBounds = true
        self.placeScroll.addSubview(btnHospital)
        
       
        let btnCoffee = UIButton(frame: CGRect(x: 0, y: 0, width: 106, height: 30))
        btnCoffee.frame.origin = CGPoint(x: 136, y: 0)
        btnCoffee.setImage(UIImage(named: "coffe"), for: .normal)
        btnCoffee.setBackgroundImage(UIImage(named:"rectangle4Copy5"), for: .normal)
        btnCoffee.setTitle("Coffee", for: .normal)
        btnCoffee.setTitleColor(UIColor.white, for: .normal)
        btnCoffee.addTarget(self, action: #selector(self.changePlace(_:)), for: UIControlEvents.touchUpInside)
        btnCoffee.accessibilityHint = "coffee"
        btnCoffee.titleLabel?.font = UIFont(name: "Kailasa", size: 14)
        btnCoffee.titleEdgeInsets = UIEdgeInsetsMake(0, 4, 0, 0)
        btnCoffee.imageEdgeInsets = UIEdgeInsetsMake(0, -12, 0, 0)
        self.placeScroll.addSubview(btnCoffee)
        
        
        let btnGrocery = UIButton(frame: CGRect(x: 0, y: 0, width: 106, height: 30))
        btnGrocery.frame.origin = CGPoint(x: 244, y: 0)
        btnGrocery.setImage(UIImage(named: "store"), for: .normal)
        btnGrocery.setBackgroundImage(UIImage(named:"rectangle4Copy5"), for: .normal)
        btnGrocery.setBackgroundImage(UIImage(named:"rectangle4Copy4"), for: .selected)
        btnGrocery.setTitle("Store", for: .normal)
        btnGrocery.setTitleColor(UIColor.white, for: .normal)
        btnGrocery.setTitleColor(UIColor.red, for: .selected)
        btnGrocery.addTarget(self, action: #selector(self.changePlace(_:)), for: UIControlEvents.touchUpInside)
        btnGrocery.accessibilityHint = "store"
        btnGrocery.titleLabel?.font = UIFont(name: "Kailasa", size: 14)
        btnGrocery.titleEdgeInsets = UIEdgeInsetsMake(0, 4, 0, 0)
        btnGrocery.imageEdgeInsets = UIEdgeInsetsMake(0, -12, 0, 0)
        self.placeScroll.addSubview(btnGrocery)
        
        
        let btnparking = UIButton(frame: CGRect(x: 0, y: 0, width: 106, height: 30))
        btnparking.frame.origin = CGPoint(x: 352, y: 0)
        btnparking.setImage(UIImage(named: "coffe"), for: .normal)
        btnparking.setBackgroundImage(UIImage(named:"rectangle4Copy5"), for: .normal)
        btnparking.setBackgroundImage(UIImage(named:"rectangle4Copy4"), for: .selected)
        btnparking.setTitle("Parking", for: .normal)
        btnparking.setTitleColor(UIColor.white, for: .normal)
        btnparking.setTitleColor(UIColor.red, for: .selected)
        btnparking.addTarget(self, action: #selector(self.changePlace(_:)), for: UIControlEvents.touchUpInside)
        btnparking.accessibilityHint = "parking"
        btnparking.titleLabel?.font = UIFont(name: "Kailasa", size: 14)
        btnparking.titleEdgeInsets = UIEdgeInsetsMake(0, 4, 0, 0)
        btnparking.imageEdgeInsets = UIEdgeInsetsMake(0, -12, 0, 0)
        self.placeScroll.addSubview(btnparking)
        
        
        
        
        
        
        
        
        
        
        placeScroll.contentSize.height = 30
        placeScroll.contentSize.width = 1000
        
        placeScroll.alwaysBounceHorizontal = false
        placeScroll.showsHorizontalScrollIndicator = false
        
        
    }
    @objc func changePlace(_ sender:UIButton)
    {
        if sender.isSelected == true
       {
        sender.isSelected = false
        self.place1.removeAll {$0 == sender.accessibilityHint!}
        }
        else
        {
            sender.isSelected = true
            self.place1.append(sender.accessibilityHint!)
        }
        let changedMode = sender.accessibilityHint
        //sender.setBackgroundImage(UIImage(named:"rectangle4Copy4"), for: .normal)
        //sender.setTitleColor(UIColor.red, for: .normal)
        self.place = changedMode!
    }
    
    
    let marker: GMSMarker = GMSMarker()
    
    var result = String()
    
    func GetLastLongitudeandLatitude()
    {
        
        locationObservationToken = observe(\ViewController.newlocation.lastlocation, options: [.new]) { (vc, change) in
            guard let updatedLocation = change.newValue else {return}
            
            self.CurrentLongandLat.latitude = updatedLocation.longitude
            self.CurrentLongandLat.longitude = updatedLocation.latitude
            
            var testLocation = CLLocationCoordinate2D()
            testLocation.latitude = CLLocationDegrees(42.6611321)
            testLocation.longitude = CLLocationDegrees(21.1527002)
            
            
            
            vc.testLongitude.text = String(self.distancekm)
            
            if(GMSGeometryIsLocationOnPathTolerance(updatedLocation, self.pathOfRoute!, true, 25))
            {
                for pointsofcurrentPolyline in self.objRoutePolyline
                {
                    let currentPolyline = pointsofcurrentPolyline.points
                    self.currentPathOfRoute = GMSPath.init(fromEncodedPath: currentPolyline)
                    if(GMSGeometryIsLocationOnPathTolerance(updatedLocation, self.currentPathOfRoute!, true, 25))
                    {
                        let latOfEndlocation = pointsofcurrentPolyline.latOfEndLocation
                        let lngOfEndlocation = pointsofcurrentPolyline.lngOfEndLocation
                        let coordinateOfEndlocation = CLLocation(latitude: CLLocationDegrees(latOfEndlocation), longitude: CLLocationDegrees(lngOfEndlocation))
                        let currentLocation = CLLocation(latitude: updatedLocation.latitude, longitude: updatedLocation.longitude)
                        let distanceInMeter = coordinateOfEndlocation.distance(from: currentLocation)
                        // let distanceInMeter = coordinateOfEndlocation.distance(from: CLLocation(latitude: testLocation.latitude, longitude: testLocation.longitude))
                        
                        
                        
                        if(distanceInMeter <= 1000)
                        {
                            self.result = "edhe \(distanceInMeter) deri tek kthesa"
                            vc.test.text = self.result
                            print("edhe \(distanceInMeter) deri tek kthesa")
                            self.testLongitude.text = self.result
                            self.lblNextDestination.text = pointsofcurrentPolyline.htmlInstructions
                        }
                        else
                        {
                            print("me shume")
                        }
                    }
                    
                }
                
                self.result="You are in route"
                vc.test.text = self.result
                
            }
            else
            {
                self.result="You are not in route"
                vc.test.text = self.result
            }
        }
    }
    
    //MARK: - this is function for create direction path, from start location to desination location
    func printTest()
    {
        let myCoordinate = locationManager.location!.coordinate
        
        
        
        
        
        let coordinateInArray = coordinateOfStory.components(separatedBy: " + ")
        
        let latOfStory =  coordinateInArray[0]
        let lngOfStory = coordinateInArray[1]
        endLocationOfStory = CLLocation(latitude: Double(latOfStory)!, longitude: Double(lngOfStory)!)
        let latOfme = myCoordinate.latitude
        let lngOfme = myCoordinate.longitude
        let myLoc = CLLocation(latitude: Double(latOfme), longitude: Double(lngOfme))
        
        drawPathForStory(startLocation: myLoc, endLocation: endLocationOfStory)
        
    }
    
    
    
    func drawPathForStory(startLocation: CLLocation, endLocation: CLLocation)
    {
        let origin = "\(startLocation.coordinate.latitude),\(startLocation.coordinate.longitude)"
        let destination = "\(endLocation.coordinate.latitude),\(endLocation.coordinate.longitude)"
        let url = "https://maps.googleapis.com/maps/api/directions/json?origin=\(origin)&destination=\(destination)&avoid=highways&mode=walking&key=AIzaSyD-wh8P9NHuPKMO8mSsTyShcR996Hxw06o"
        Alamofire.request(url).responseJSON { response in
            print(response.request as Any)  // original URL request
            print(response.response as Any) // HTTP URL response
            print(response.data as Any)     // server data
            print(response.result as Any)   // result of response serialization
            let json = try! JSON(data: response.data!)
            let routes = json["routes"].arrayValue
            print(json)
            do {
                self.objRoutes = try JSONDecoder().decode(RootClass.self, from: response.data!)
            }
            catch let error {
                print("Sboni \(error)")
            }
            self.drawRoute()
            
            
            
        }
        
    }
    
    func drawPath(startLocation: CLLocation, endLocation: CLLocation, mode: String)
    {
        let modeoftransport = mode
        let origin = "\(startLocation.coordinate.latitude),\(startLocation.coordinate.longitude)"
        let destination = "\(endLocation.coordinate.latitude),\(endLocation.coordinate.longitude)"
        let url = "https://maps.googleapis.com/maps/api/directions/json?origin=\(origin)&destination=\(destination)&avoid=highways&mode=\(modeoftransport)&key=AIzaSyD-wh8P9NHuPKMO8mSsTyShcR996Hxw06o"
        Alamofire.request(url).responseJSON { response in
            print(response.request as Any)
            print(response.response as Any)
            print(response.data as Any)
            print(response.result as Any)
            let json = try! JSON(data: response.data!)
            let routes = json["routes"].arrayValue
            do {
                self.objRoutes = try JSONDecoder().decode(RootClass.self, from: response.data!)
            }
            catch let error { print("Nuk funksionon \(error)") }
            self.drawRoute() ;self.GetNearPlaces()
        }
    }
    func drawRoute()
    {
        googleMaps.clear()
        for route in objRoutes.routes
        {
            self.pathOfRoute = GMSPath.init(fromEncodedPath: route.overview_polyline.points!)
            for leg in route.legs
            {
                for step in leg.steps
                {
                    let overviewPolyline = step.polyline.points
                    let htmlInstructions1 = step.html_instructions
                    //self.pathOfRoute = GMSPath.init(fromEncodedPath: overviewPolyline!)
                    let polyline = GMSPolyline.init(path: self.pathOfRoute)
                    polyline.strokeWidth = 4
                    polyline.strokeColor = UIColor.red
                    polyline.map = self.googleMaps
                    self.objRoutePolyline.append(RoutePolyline(points: overviewPolyline!, latOfEndLocation: Float(step.end_location.lat!), lngOfEndLocation: Float(step.end_location.lng!), htmlInstructions : htmlInstructions1!))
                }
            }
        }
    }
    func GetNearPlaces()
    {
        let modeofplace = self.place
        self.objPlaces.removeAll()
        for route in objRoutes.routes
        {
            for leg in route.legs
            {
                for step in leg.steps
                {   let lat = "\(step.start_location.lat!)"
                    let lng = "\(step.start_location.lng!)"
                    let placeUrlRequest="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=\(lat),\(lng)&radius=500&type=\(modeofplace)&keyword=\(modeofplace)&key=AIzaSyD-wh8P9NHuPKMO8mSsTyShcR996Hxw06o"
                    Alamofire.request(placeUrlRequest).responseJSON { response in
                        print(response.request as Any)
                        print(response.response as Any)
                        print(response.data as Any)
                        print(response.result as Any)
                        do {
                            self.objPlaces.append(try JSONDecoder().decode(RootClass1.self, from: response.data!))
                        }
                        catch let error { print("Nuk funksionon \(error)") }
                        self.drawPlace()
                    }
                }
            }}
    }
    func drawPlace()
    {
        for Places in self.objPlaces
        {
            for result in Places.results
            {
                let lat = result.geometry.location.lat
                let lng = result.geometry.location.lng
                let latitude = Double(lat!)
                let longitude = Double(lng!)
                let marker = GMSMarker(position: CLLocationCoordinate2D(latitude: latitude, longitude: longitude))
                marker.map = self.googleMaps
            }
        }
    }
    @IBAction func btnCamera(_ sender: Any) {
        performSegue(withIdentifier: "showCamera_Segue", sender: nil)
    }
    
    @IBOutlet weak var searchPopupview: UIView!
    @IBAction func NavigateBtn(_ sender: Any) {
        GetLastLongitudeandLatitude()
        initializeTheLocationManager()
        
    }
    
    @IBAction func btnBestPlaces(_ sender: Any) {
    performSegue(withIdentifier: "bestplaces_segue", sender: nil)
    }
    
    
    
    @IBAction func GetcurrentLocation(_ sender: Any) {
        //        initializeTheLocationManager()
    }
    // MARK: when start location tap, this will open the search location
    @IBAction func openStartLocation(_ sender: UIButton) {
        
        let autoCompleteController = GMSAutocompleteViewController()
        autoCompleteController.delegate = self
        
        // selected location
        locationSelected = .startLocation
        
        // Change text color
        UISearchBar.appearance().setTextColor(color: UIColor.black)
        self.locationManager.stopUpdatingLocation()
        
        self.present(autoCompleteController, animated: true, completion: nil)
    }
    
    
    // MARK: when destination location tap, this will open the search location
    @IBAction func openDestinationLocation(_ sender: UIButton) {
        
        let autoCompleteController = GMSAutocompleteViewController()
        autoCompleteController.delegate = self
        
        // selected location
        locationSelected = .destinationLocation
        
        // Change text color
        UISearchBar.appearance().setTextColor(color: UIColor.black)
        self.locationManager.stopUpdatingLocation()
        
        self.present(autoCompleteController, animated: true, completion: nil)
    }
    
    
    
    
    
    
    @IBAction func NavigateButton(_ sender: Any) {
        initializeTheLocationManager()
        self.googleMaps.isMyLocationEnabled=true
        // GetLastLongitudeandLatitude()
        //navigateToDestination(startLoc: locationStart,endLoc: locationEnd)
        GetLastLongitudeandLatitude()
    }
    // MARK: SHOW DIRECTIO WITH BUTTON
    @IBAction func showDirection(_ sender: UIButton) {
        // when button direction tapped, must call drawpath func
        print("t")
        self.drawPath(startLocation: locationStart, endLocation: locationEnd, mode: self.mode)
        self.searchPopupview.isHidden = true
        //self.drawPath(startLocation: startTestLocation, endLocation: locationEnd)
    }
    
    
    
    
    @IBAction func ShowSearch(_ sender: Any) {
        //marginTop.constant = 68
        //bottommargin.constant = 0
        // searchIconTop.constant = 100
        //searchPopupview.isHidden = false
        //  self.searchPopupview.isHidden = false
        //        UIView.animate(withDuration: 0.9, animations: {
        //            self.searchPopupview.alpha = 1
        //        }, completion:  nil)
        //
        self.searchPopupview.isHidden = false
        UIView.animate(withDuration: 1, delay: 5, options: .curveEaseOut, animations: {self.searchPopupview.alpha = 1.0}) { (isCompleted) in}
        
        
        print("clicked")
    }
    
    
}

// MARK: - GMS Auto Complete Delegate, for autocomplete search location
extension ViewController: GMSAutocompleteViewControllerDelegate {
    
    func viewController(_ viewController: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        print("Error \(error)")
    }
    
    
    
    
    func viewController(_ viewController: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        
        // Change map location
        let camera = GMSCameraPosition.camera(withLatitude: place.coordinate.latitude, longitude: place.coordinate.longitude, zoom: 12.0
        )
        
        // set coordinate to text
        if locationSelected == .startLocation {
            btnStartLocation.setTitle("\(place.coordinate.latitude), \(place.coordinate.longitude)", for: .normal)
           // startLocation.text = "\(place.coordinate.latitude), \(place.coordinate.longitude)"
            locationStart = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            createMarker(titleMarker: "Location Start", iconMarker: #imageLiteral(resourceName: "placeholder"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        } else {
            btnEndLocation.setTitle("\(place.coordinate.latitude), \(place.coordinate.longitude)", for: .normal)
            //destinationLocation.text = "\(place.coordinate.latitude), \(place.coordinate.longitude)"
            locationEnd = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            createMarker(titleMarker: "Location End", iconMarker: #imageLiteral(resourceName: "flag"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        }
        
        
        self.googleMaps.camera = camera
        self.dismiss(animated: true, completion: nil)
        
    }
    
    func wasCancelled(_ viewController: GMSAutocompleteViewController) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func didRequestAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
    }
    
    func didUpdateAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
    
}

public extension UISearchBar {
    
    public func setTextColor(color: UIColor) {
        let svs = subviews.flatMap { $0.subviews }
        guard let tf = (svs.filter { $0 is UITextField }).first as? UITextField else { return }
        tf.textColor = color
    }
    
    
}


