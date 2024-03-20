package cn.lookout.base.bean;

/**
 * 园区设备信息
 * @author Administrator
 *
 */
public class ParkDeviceInfo {

	private Integer companyId;
	private String temperature;//温度
	private String humidity;//湿度
	private String windSpeed;//风速
	private String rain;//降雨量
	private String evaporation;//蒸发量
	private String altitude;//海拔高度
	private String windDirection;//风向
	private String airPressure;//大气压
	private String lightRadiation;//光合辐射
	
	public Integer getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	public String getTemperature() {
		return temperature;
	}
	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}
	public String getHumidity() {
		return humidity;
	}
	public void setHumidity(String humidity) {
		this.humidity = humidity;
	}
	public String getWindSpeed() {
		return windSpeed;
	}
	public void setWindSpeed(String windSpeed) {
		this.windSpeed = windSpeed;
	}
	public String getRain() {
		return rain;
	}
	public void setRain(String rain) {
		this.rain = rain;
	}
	public String getEvaporation() {
		return evaporation;
	}
	public void setEvaporation(String evaporation) {
		this.evaporation = evaporation;
	}
	public String getAltitude() {
		return altitude;
	}
	public void setAltitude(String altitude) {
		this.altitude = altitude;
	}
	public String getWindDirection() {
		return windDirection;
	}
	public void setWindDirection(String windDirection) {
		this.windDirection = windDirection;
	}
	public String getAirPressure() {
		return airPressure;
	}
	public void setAirPressure(String airPressure) {
		this.airPressure = airPressure;
	}
	public String getLightRadiation() {
		return lightRadiation;
	}
	public void setLightRadiation(String lightRadiation) {
		this.lightRadiation = lightRadiation;
	}
	
	
}
