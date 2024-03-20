package cn.lookout.ws;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;
@ServerEndpoint("/websocket")
public class WebSocketAction {
	
	private static Logger logger = Logger.getLogger(WebSocketAction.class);
	
	public static Map<String,Session> sessionMap = new ConcurrentHashMap<>();
	
    @OnOpen
    public void start(Session session) {
    	logger.info("连接服务器成功");
    }
    
    @OnMessage
    public void onMessage(String message, Session session) throws IOException, InterruptedException {
    	logger.info("服务器收到消息" + message);
        sessionMap.put( message , session );
    }

    /**
     * websocket推送
     * @param message	推送的消息
     * @param toUserId	推送的对象
     */
    public static void sendString(String message, String toUserId){
    	Session session = sessionMap.get(toUserId);
    	if(session != null && session.isOpen()){
    		try {
				session.getBasicRemote().sendText(message);
				logger.info("推送websocket消息成功：" + message);
			} catch (IOException e) {
				e.printStackTrace();
			}
    	}else{
    		logger.info("推送websocket消息失败：" + message);
    	}
    }

    @OnClose
    public void end() {
        sessionMap.remove(this);
    }

	
}