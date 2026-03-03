declare module 'java.net.http.WebSocket' {
import { Duration } from 'java.time';
import { CharSequence, Throwable } from 'java.lang';
import { URI } from 'java.net';
import { CompletableFuture, CompletionStage } from 'java.util.concurrent';
import { WebSocket } from 'java.net.http';
import { ByteBuffer } from 'java.nio';
/**
 * A builder of {@linkplain WebSocket WebSocket Clients}.
 *
 *  Builders are created by invoking
 * {@link HttpClient#newWebSocketBuilder HttpClient.newWebSocketBuilder}.
 * The intermediate (setter-like) methods change the state of the builder
 * and return the same builder they have been invoked on. If an intermediate
 * method is not invoked, an appropriate default value (or behavior) will be
 * assumed. A `Builder` is not safe for use by multiple threads
 * without external synchronization.
 *
 * @since 11
*/
export class Builder {
  /**
   * Adds the given name-value pair to the list of additional HTTP headers
   * sent during the opening handshake.
   *
   *  Headers defined in the
   * WebSocket
   * Protocol are illegal. If this method is not invoked, no
   * additional HTTP headers will be sent.
   *
   * @param name
   *         the header name
   * @param value
   *         the header value
   *
   * @return this builder
  */
  header(name: string, value: string): Builder;
  /**
   * Sets a timeout for establishing a WebSocket connection.
   *
   *  If the connection is not established within the specified
   * duration then building of the `WebSocket` will fail with
   * {@link HttpTimeoutException}. If this method is not invoked then the
   * infinite timeout is assumed.
   *
   * @param timeout
   *         the timeout, non-{@linkplain Duration#isNegative() negative},
   *         non-{@linkplain Duration#ZERO ZERO}
   *
   * @return this builder
  */
  connectTimeout(timeout: Duration): Builder;
  /**
   * Sets a request for the given subprotocols.
   *
   *  After the `WebSocket` has been built, the actual
   * subprotocol can be queried through
   * {@link WebSocket#getSubprotocol WebSocket.getSubprotocol()}.
   *
   *  Subprotocols are specified in the order of preference. The most
   * preferred subprotocol is specified first. If there are any additional
   * subprotocols they are enumerated from the most preferred to the least
   * preferred.
   *
   *  Subprotocols not conforming to the syntax of subprotocol
   * identifiers are illegal. If this method is not invoked then no
   * subprotocols will be requested.
   *
   * @param mostPreferred
   *         the most preferred subprotocol
   * @param lesserPreferred
   *         the lesser preferred subprotocols
   *
   * @return this builder
  */
  subprotocols(mostPreferred: string, ...lesserPreferred: string[]): Builder;
  /**
   * Builds a {@link WebSocket} connected to the given `URI` and
   * associated with the given `Listener`.
   *
   *  Returns a `CompletableFuture` which will either complete
   * normally with the resulting `WebSocket` or complete
   * exceptionally with one of the following errors:
   * 
   *  {@link IOException} -
   *          if an I/O error occurs
   *  {@link WebSocketHandshakeException} -
   *          if the opening handshake fails
   *  {@link HttpTimeoutException} -
   *          if the opening handshake does not complete within
   *          the timeout
   *  {@link InterruptedException} -
   *          if the operation is interrupted
   *  {@link SecurityException} -
   *          if a security manager has been installed and it denies
   *          {@link java.net.URLPermission access} to `uri`.
   *          Security checks
   *          contains more information relating to the security context
   *          in which the listener is invoked.
   *  {@link IllegalArgumentException} -
   *          if any of the arguments of this builder's methods are
   *          illegal
   * 
   *
   * @param uri
   *         the WebSocket URI
   * @param listener
   *         the listener
   *
   * @return a `CompletableFuture` with the `WebSocket`
  */
  buildAsync(uri: URI, listener: Listener): CompletableFuture<WebSocket>;
}
/**
 * The receiving interface of `WebSocket`.
 *
 *  A `WebSocket` invokes methods of the associated listener
 * passing itself as an argument. These methods are invoked in a thread-safe
 * manner, such that the next invocation may start only after the previous
 * one has finished.
 *
 *  When data has been received, the `WebSocket` invokes a receive
 * method. Methods `onText`, `onBinary`, `onPing` and
 * `onPong` must return a `CompletionStage` that completes once
 * the message has been received by the listener. If a listener's method
 * returns `null` rather than a `CompletionStage`,
 * `WebSocket` will behave as if the listener returned a
 * `CompletionStage` that is already completed normally.
 *
 *  An `IOException` raised in `WebSocket` will result in an
 * invocation of `onError` with that exception (if the input is not
 * closed). Unless otherwise stated if the listener's method throws an
 * exception or a `CompletionStage` returned from a method completes
 * exceptionally, the WebSocket will invoke `onError` with this
 * exception.
 *
 * @apiNote The strict sequential order of invocations from
 * `WebSocket` to `Listener` means, in particular, that the
 * `Listener`'s methods are treated as non-reentrant. This means that
 * `Listener` implementations do not need to be concerned with
 * possible recursion or the order in which they invoke
 * `WebSocket.request` in relation to their processing logic.
 *
 *  Careful attention may be required if a listener is associated
 * with more than a single `WebSocket`. In this case invocations
 * related to different instances of `WebSocket` may not be ordered
 * and may even happen concurrently.
 *
 *  `CompletionStage`s returned from the receive methods have
 * nothing to do with the
 * counter of invocations.
 * Namely, a `CompletionStage` does not have to be completed in order
 * to receive more invocations of the listener's methods.
 * Here is an example of a listener that requests invocations, one at a
 * time, until a complete message has been accumulated, then processes
 * the result, and completes the `CompletionStage`:
 * {@snippet :
 *        WebSocket.Listener listener = new WebSocket.Listener() {
 *
 *        List parts = new ArrayList<>();
 *        CompletableFuture accumulatedMessage = new CompletableFuture<>();
 *
 *        public CompletionStage onText(WebSocket webSocket,
 *                                         CharSequence message,
 *                                         boolean last) {
 *            parts.add(message);
 *            webSocket.request(1);
 *            if (last) {
 *                processWholeText(parts);
 *                parts = new ArrayList<>();
 *                accumulatedMessage.complete(null);
 *                CompletionStage cf = accumulatedMessage;
 *                accumulatedMessage = new CompletableFuture<>();
 *                return cf;
 *            }
 *            return accumulatedMessage;
 *        }
 *    }; }
 *
 * @since 11
*/
export class Listener {
  /**
   * A `WebSocket` has been connected.
   *
   *  This is the initial invocation and it is made once. It is
   * typically used to make a request for more invocations.
   *
   * @implSpec The default implementation is equivalent to:
   * {@snippet :
   *  webSocket.request(1); }
   *
   * @param webSocket
   *         the WebSocket that has been connected
  */
  onOpen(webSocket: WebSocket): void;
  /**
   * A textual data has been received.
   *
   *  Return a `CompletionStage` which will be used by the
   * `WebSocket` as an indication it may reclaim the
   * `CharSequence`. Do not access the `CharSequence` after
   * this `CompletionStage` has completed.
   *
   * @implSpec The default implementation is equivalent to:
   * {@snippet :
   *    webSocket.request(1);
   *    return null; }
   *
   * @implNote The `data` is always a legal UTF-16 sequence.
   *
   * @param webSocket
   *         the WebSocket on which the data has been received
   * @param data
   *         the data
   * @param last
   *         whether this invocation completes the message
   *
   * @return a `CompletionStage` which completes when the
   * `CharSequence` may be reclaimed; or `null` if it may be
   * reclaimed immediately
  */
  onText(webSocket: WebSocket, data: CharSequence, last: boolean): CompletionStage<any>;
  /**
   * A binary data has been received.
   *
   *  This data is located in bytes from the buffer's position to its
   * limit.
   *
   *  Return a `CompletionStage` which will be used by the
   * `WebSocket` as an indication it may reclaim the
   * `ByteBuffer`. Do not access the `ByteBuffer` after
   * this `CompletionStage` has completed.
   *
   * @implSpec The default implementation is equivalent to:
   * {@snippet :
   *    webSocket.request(1);
   *    return null; }
   *
   * @param webSocket
   *         the WebSocket on which the data has been received
   * @param data
   *         the data
   * @param last
   *         whether this invocation completes the message
   *
   * @return a `CompletionStage` which completes when the
   * `ByteBuffer` may be reclaimed; or `null` if it may be
   * reclaimed immediately
  */
  onBinary(webSocket: WebSocket, data: ByteBuffer, last: boolean): CompletionStage<any>;
  /**
   * A Ping message has been received.
   *
   *  As guaranteed by the WebSocket Protocol, the message consists of
   * not more than `125` bytes. These bytes are located from the
   * buffer's position to its limit.
   *
   *  Given that the WebSocket implementation will automatically send a
   * reciprocal pong when a ping is received, it is rarely required to
   * send a pong message explicitly when a ping is received.
   *
   *  Return a `CompletionStage` which will be used by the
   * `WebSocket` as a signal it may reclaim the
   * `ByteBuffer`. Do not access the `ByteBuffer` after
   * this `CompletionStage` has completed.
   *
   * @implSpec The default implementation is equivalent to:
   * {@snippet :
   *    webSocket.request(1);
   *    return null; }
   *
   * @param webSocket
   *         the WebSocket on which the message has been received
   * @param message
   *         the message
   *
   * @return a `CompletionStage` which completes when the
   * `ByteBuffer` may be reclaimed; or `null` if it may be
   * reclaimed immediately
  */
  onPing(webSocket: WebSocket, message: ByteBuffer): CompletionStage<any>;
  /**
   * A Pong message has been received.
   *
   *  As guaranteed by the WebSocket Protocol, the message consists of
   * not more than `125` bytes. These bytes are located from the
   * buffer's position to its limit.
   *
   *  Return a `CompletionStage` which will be used by the
   * `WebSocket` as a signal it may reclaim the
   * `ByteBuffer`. Do not access the `ByteBuffer` after
   * this `CompletionStage` has completed.
   *
   * @implSpec The default implementation is equivalent to:
   * {@snippet :
   *    webSocket.request(1);
   *    return null; }
   *
   * @param webSocket
   *         the WebSocket on which the message has been received
   * @param message
   *         the message
   *
   * @return a `CompletionStage` which completes when the
   * `ByteBuffer` may be reclaimed; or `null` if it may be
   * reclaimed immediately
  */
  onPong(webSocket: WebSocket, message: ByteBuffer): CompletionStage<any>;
  /**
   * Receives a Close message indicating the WebSocket's input has been
   * closed.
   *
   *  This is the last invocation from the specified `WebSocket`.
   * By the time this invocation begins the WebSocket's input will have
   * been closed.
   *
   *  A Close message consists of a status code and a reason for
   * closing. The status code is an integer from the range
   * `1000 <= code <= 65535`. The `reason` is a string which
   * has a UTF-8 representation not longer than `123` bytes.
   *
   *  If the WebSocket's output is not already closed, the
   * `CompletionStage` returned by this method will be used as an
   * indication that the WebSocket's output may be closed. The WebSocket
   * will close its output at the earliest of completion of the returned
   * `CompletionStage` or invoking either of the `sendClose`
   * or `abort` methods.
   *
   * @apiNote Returning a `CompletionStage` that never completes,
   * effectively disables the reciprocating closure of the output.
   *
   *  To specify a custom closure code or reason code the
   * `sendClose` method may be invoked from inside the
   * `onClose` invocation:
   * {@snippet :
   *       public CompletionStage onClose(WebSocket webSocket,
   *                            int statusCode,
   *                            String reason) {
   *        webSocket.sendClose(CUSTOM_STATUS_CODE, CUSTOM_REASON);
   *        return new CompletableFuture();
   *    } }
   *
   * @implSpec The default implementation of this method returns
   * `null`, indicating that the output should be closed
   * immediately.
   *
   * @param webSocket
   *         the WebSocket on which the message has been received
   * @param statusCode
   *         the status code
   * @param reason
   *         the reason
   *
   * @return a `CompletionStage` which completes when the
   * `WebSocket` may be closed; or `null` if it may be
   * closed immediately
  */
  onClose(webSocket: WebSocket, statusCode: number, reason: string): CompletionStage<any>;
  /**
   * An error has occurred.
   *
   *  This is the last invocation from the specified WebSocket. By the
   * time this invocation begins both the WebSocket's input and output
   * will have been closed. A WebSocket may invoke this method on the
   * associated listener at any time after it has invoked `onOpen`,
   * regardless of whether or not any invocations have been requested from
   * the WebSocket.
   *
   *  If an exception is thrown from this method, resulting behavior is
   * undefined.
   *
   * @param webSocket
   *         the WebSocket on which the error has occurred
   * @param error
   *         the error
  */
  onError(webSocket: WebSocket, error: Throwable): void;
}

}
declare module 'java.net.http' {
import { Builder as java_net_http_WebSocket_Builder } from 'java.net.http.WebSocket';
import { Optional, OptionalLong, List, Map } from 'java.util';
import { CompletableFuture, Executor } from 'java.util.concurrent';
import { ByteBuffer } from 'java.nio';
import { Builder as java_net_http_HttpRequest_Builder, BodyPublisher } from 'java.net.http.HttpRequest';
import { Duration } from 'java.time';
import { AutoCloseable, CharSequence, Throwable } from 'java.lang';
import { ProxySelector, URI, Authenticator, CookieHandler } from 'java.net';
import { IOException } from 'java.io';
import { Version, Builder, Redirect } from 'java.net.http.HttpClient';
import { BiPredicate } from 'java.util.function';
import { SSLParameters, SSLSession, SSLContext } from 'javax.net.ssl';
import { PushPromiseHandler, BodyHandler } from 'java.net.http.HttpResponse';
/**
 * A WebSocket Client.
 *
 *  `WebSocket` instances are created through {@link WebSocket.Builder}.
 *
 *  WebSocket has an input and an output side. These sides are independent
 * from each other. A side can either be open or closed. Once closed, the side
 * remains closed. WebSocket messages are sent through a `WebSocket` and
 * received through a `WebSocket.Listener` associated with it. Messages
 * can be sent until the WebSocket's output is closed, and received until the
 * WebSocket's input is closed.
 *
 *  A send method is any of the `sendText`, `sendBinary`,
 * `sendPing`, `sendPong` and `sendClose` methods of
 * `WebSocket`. A send method initiates a send operation and returns a
 * `CompletableFuture` which completes once the operation has completed.
 * If the `CompletableFuture` completes normally the operation is
 * considered succeeded. If the `CompletableFuture` completes
 * exceptionally, the operation is considered failed. An operation that has been
 * initiated but not yet completed is considered pending.
 *
 *  A receive method is any of the `onText`, `onBinary`,
 * `onPing`, `onPong` and `onClose` methods of
 * `Listener`. WebSocket initiates a receive operation by invoking a
 * receive method on the listener. The listener then must return a
 * `CompletionStage` which completes once the operation has completed.
 *
 *  To control receiving of messages, a WebSocket maintains an
 * internal counter. This counter's value is a number of
 * times the WebSocket has yet to invoke a receive method. While this counter is
 * zero the WebSocket does not invoke receive methods. The counter is
 * incremented by `n` when `request(n)` is called. The counter is
 * decremented by one when the WebSocket invokes a receive method.
 * `onOpen` and `onError` are not receive methods. WebSocket invokes
 * `onOpen` prior to any other methods on the listener. WebSocket invokes
 * `onOpen` at most once. WebSocket may invoke `onError` at any
 * given time. If the WebSocket invokes `onError` or `onClose`, then
 * no further listener's methods will be invoked, no matter the value of the
 * counter. For a newly built WebSocket the counter is zero.
 *
 *  Unless otherwise stated, `null` arguments will cause methods
 * of `WebSocket` to throw `NullPointerException`, similarly,
 * `WebSocket` will not pass `null` arguments to methods of
 * `Listener`. The state of a WebSocket is not changed by the invocations
 * that throw or return a `CompletableFuture` that completes with one of
 * the `NullPointerException`, `IllegalArgumentException`,
 * `IllegalStateException` exceptions.
 *
 *  `WebSocket` handles received Ping and Close messages automatically
 * (as per the WebSocket Protocol) by replying with Pong and Close messages. If
 * the listener receives Ping or Close messages, no mandatory actions from the
 * listener are required.
 *
 * @apiNote The relationship between a WebSocket and the associated Listener is
 * analogous to that of a Subscription and the associated Subscriber of type
 * {@link java.util.concurrent.Flow}.
 *
 * @since 11
*/
export class WebSocket {
  /**
   * The WebSocket Close message status code ({@value}),
   * indicating normal closure, meaning that the purpose for which the
   * connection was established has been fulfilled.
   *
   * @see #sendClose(int, String)
   * @see Listener#onClose(WebSocket, int, String)
  */
  static readonly NORMAL_CLOSURE: number;
  /**
   * Sends textual data with characters from the given character sequence.
   *
   *  The character sequence must not be modified until the
   * `CompletableFuture` returned from this method has completed.
   *
   *  A `CompletableFuture` returned from this method can
   * complete exceptionally with:
   * 
   *  {@link IllegalStateException} -
   *          if there is a pending text or binary send operation
   *          or if the previous binary data does not complete the message
   *  {@link IOException} -
   *          if an I/O error occurs, or if the output is closed
   * 
   *
   * @implNote If `data` is a malformed UTF-16 sequence, the operation
   * will fail with `IOException`.
   *
   * @param data
   *         the data
   * @param last
   *         `true` if this invocation completes the message,
   *         `false` otherwise
   *
   * @return a `CompletableFuture` that completes, with this WebSocket,
   * when the data has been sent
  */
  sendText(data: CharSequence, last: boolean): CompletableFuture<WebSocket>;
  /**
   * Sends binary data with bytes from the given buffer.
   *
   *  The data is located in bytes from the buffer's position to its limit.
   * Upon normal completion of a `CompletableFuture` returned from this
   * method the buffer will have no remaining bytes. The buffer must not be
   * accessed until after that.
   *
   *  The `CompletableFuture` returned from this method can
   * complete exceptionally with:
   * 
   *  {@link IllegalStateException} -
   *          if there is a pending text or binary send operation
   *          or if the previous textual data does not complete the message
   *  {@link IOException} -
   *          if an I/O error occurs, or if the output is closed
   * 
   *
   * @param data
   *         the data
   * @param last
   *         `true` if this invocation completes the message,
   *         `false` otherwise
   *
   * @return a `CompletableFuture` that completes, with this WebSocket,
   * when the data has been sent
  */
  sendBinary(data: ByteBuffer, last: boolean): CompletableFuture<WebSocket>;
  /**
   * Sends a Ping message with bytes from the given buffer.
   *
   *  The message consists of not more than `125` bytes from the
   * buffer's position to its limit. Upon normal completion of a
   * `CompletableFuture` returned from this method the buffer will
   * have no remaining bytes. The buffer must not be accessed until after that.
   *
   *  The `CompletableFuture` returned from this method can
   * complete exceptionally with:
   * 
   *  {@link IllegalStateException} -
   *          if there is a pending ping or pong send operation
   *  {@link IllegalArgumentException} -
   *          if the message is too long
   *  {@link IOException} -
   *          if an I/O error occurs, or if the output is closed
   * 
   *
   * @param message
   *         the message
   *
   * @return a `CompletableFuture` that completes, with this WebSocket,
   * when the Ping message has been sent
  */
  sendPing(message: ByteBuffer): CompletableFuture<WebSocket>;
  /**
   * Sends a Pong message with bytes from the given buffer.
   *
   *  The message consists of not more than `125` bytes from the
   * buffer's position to its limit. Upon normal completion of a
   * `CompletableFuture` returned from this method the buffer will have
   * no remaining bytes. The buffer must not be accessed until after that.
   *
   *  Given that the WebSocket implementation will automatically send a
   * reciprocal pong when a ping is received, it is rarely required to send a
   * pong message explicitly.
   *
   *  The `CompletableFuture` returned from this method can
   * complete exceptionally with:
   * 
   *  {@link IllegalStateException} -
   *          if there is a pending ping or pong send operation
   *  {@link IllegalArgumentException} -
   *          if the message is too long
   *  {@link IOException} -
   *          if an I/O error occurs, or if the output is closed
   * 
   *
   * @param message
   *         the message
   *
   * @return a `CompletableFuture` that completes, with this WebSocket,
   * when the Pong message has been sent
  */
  sendPong(message: ByteBuffer): CompletableFuture<WebSocket>;
  /**
   * Initiates an orderly closure of this WebSocket's output by
   * sending a Close message with the given status code and the reason.
   *
   *  The `statusCode` is an integer from the range
   * `1000 <= code <= 4999`. Status codes `1002`, `1003`,
   * `1006`, `1007`, `1009`, `1010`, `1012`,
   * `1013` and `1015` are illegal. Behaviour in respect to other
   * status codes is implementation-specific. A legal `reason` is a
   * string that has a UTF-8 representation not longer than `123` bytes.
   *
   *  A `CompletableFuture` returned from this method can
   * complete exceptionally with:
   * 
   *  {@link IllegalArgumentException} -
   *           if `statusCode` is illegal, or
   *           if `reason` is illegal
   *  {@link IOException} -
   *           if an I/O error occurs, or if the output is closed
   * 
   *
   *  Unless the `CompletableFuture` returned from this method
   * completes with `IllegalArgumentException`, or the method throws
   * `NullPointerException`, the output will be closed.
   *
   *  If not already closed, the input remains open until a Close message
   * {@linkplain Listener#onClose(WebSocket, int, String) received}, or
   * `abort` is invoked, or an
   * {@linkplain Listener#onError(WebSocket, Throwable) error} occurs.
   *
   * @apiNote Use the provided integer constant {@link #NORMAL_CLOSURE} as a
   * status code and an empty string as a reason in a typical case:
   * {@snippet :
   *      CompletableFuture webSocket = ...
   *      webSocket.thenCompose(ws -> ws.sendText("Hello, ", false))
   *             .thenCompose(ws -> ws.sendText("world!", true))
   *             .thenCompose(ws -> ws.sendClose(WebSocket.NORMAL_CLOSURE, ""))
   *             .join();
   * }
   *
   * The `sendClose` method does not close this WebSocket's input. It
   * merely closes this WebSocket's output by sending a Close message. To
   * enforce closing the input, invoke the `abort` method. Here is an
   * example of an application that sends a Close message, and then starts a
   * timer. Once no data has been received within the specified timeout, the
   * timer goes off and the alarm aborts `WebSocket`:
   * {@snippet :
   *    MyAlarm alarm = new MyAlarm(webSocket::abort);
   *    WebSocket.Listener listener = new WebSocket.Listener() {
   *
   *        public CompletionStage onText(WebSocket webSocket,
   *                                         CharSequence data,
   *                                         boolean last) {
   *            alarm.snooze();
   *            ...
   *        }
   *        ...
   *    };
   *    ...
   *    Runnable startTimer = () -> {
   *        MyTimer idleTimer = new MyTimer();
   *        idleTimer.add(alarm, 30, TimeUnit.SECONDS);
   *    };
   *    webSocket.sendClose(WebSocket.NORMAL_CLOSURE, "ok").thenRun(startTimer); }
   *
   * @param statusCode
   *         the status code
   * @param reason
   *         the reason
   *
   * @return a `CompletableFuture` that completes, with this WebSocket,
   * when the Close message has been sent
  */
  sendClose(statusCode: number, reason: string): CompletableFuture<WebSocket>;
  /**
   * Increments the counter of invocations of receive methods.
   *
   *  This WebSocket will invoke `onText`, `onBinary`,
   * `onPing`, `onPong` or `onClose` methods on the
   * associated listener (i.e. receive methods) up to `n` more times.
   *
   * @apiNote The parameter of this method is the number of invocations being
   * requested from this WebSocket to the associated listener, not the number
   * of messages. Sometimes a message may be delivered to the listener in a
   * single invocation, but not always. For example, Ping, Pong and Close
   * messages are delivered in a single invocation of `onPing`,
   * `onPong` and `onClose` methods respectively. However, whether
   * or not Text and Binary messages are delivered in a single invocation of
   * `onText` and `onBinary` methods depends on the boolean
   * argument (`last`) of these methods. If `last` is
   * `false`, then there is more to a message than has been delivered to
   * the invocation.
   *
   *  Here is an example of a listener that requests invocations, one at a
   * time, until a complete message has been accumulated, and then processes
   * the result:
   * {@snippet :
   *        WebSocket.Listener listener = new WebSocket.Listener() {
   *
   *        StringBuilder text = new StringBuilder();
   *
   *        public CompletionStage onText(WebSocket webSocket,
   *                                         CharSequence message,
   *                                         boolean last) {
   *            text.append(message);
   *            if (last) {
   *                processCompleteTextMessage(text);
   *                text = new StringBuilder();
   *            }
   *            webSocket.request(1);
   *            return null;
   *        }
   *    }; }
   *
   * @param n
   *         the number of invocations
   *
   * @throws IllegalArgumentException
   *         if `n <= 0`
  */
  request(n: number): void;
  /**
   * Returns the subprotocol used by this WebSocket.
   *
   * @return the subprotocol, or an empty string if there's no subprotocol
  */
  get subprotocol(): string;
  /**
   * Tells whether this WebSocket's output is closed.
   *
   *  If this method returns `true`, subsequent invocations will also
   * return `true`.
   *
   * @return `true` if closed, `false` otherwise
  */
  isOutputClosed(): boolean;
  /**
   * Tells whether this WebSocket's input is closed.
   *
   *  If this method returns `true`, subsequent invocations will also
   * return `true`.
   *
   * @return `true` if closed, `false` otherwise
  */
  isInputClosed(): boolean;
  /**
   * Closes this WebSocket's input and output abruptly.
   *
   *  When this method returns both the input and the output will have been
   * closed. Any pending send operations will fail with `IOException`.
   * Subsequent invocations of `abort` will have no effect.
  */
  abort(): void;
}
/**
 * Thrown when the opening handshake has failed.
 *
 * @since 11
*/
export class WebSocketHandshakeException extends IOException {
  /**
   * Constructs a `WebSocketHandshakeException` with the given
   * `HttpResponse`.
   *
   * @param response
   *        the `HttpResponse` that resulted in the handshake failure
  */
  constructor(response: HttpResponse<any>);
  /**
   * Returns the server's counterpart of the opening handshake.
   *
   *  The value may be unavailable (`null`) if this exception has
   * been serialized and then deserialized.
   *
   * @apiNote The primary purpose of this method is to allow programmatic
   * examination of the reasons behind the failure of the opening handshake.
   * Some of these reasons might allow recovery.
   *
   * @return server response
  */
  get response(): HttpResponse<any>;
  initCause(cause: Throwable): WebSocketHandshakeException;
}
/**
 * Thrown when a connection, over which an `HttpRequest` is intended to be
 * sent, is not successfully established within a specified time period.
 *
 * @since 11
*/
export class HttpConnectTimeoutException extends HttpTimeoutException {
  /**
   * Constructs an `HttpConnectTimeoutException` with the given detail
   * message.
   *
   * @param message
   *        The detail message; can be `null`
  */
  constructor(message: string);
}
/**
 * An HTTP Client.
 *
 *  An `HttpClient` can be used to send {@linkplain HttpRequest
 * requests} and retrieve their {@linkplain HttpResponse responses}. An ` * HttpClient` is created through a {@link HttpClient.Builder builder}.
 * The {@link #newBuilder() newBuilder} method returns a builder that creates
 * instances of the default `HttpClient` implementation.
 * The builder can be used to configure per-client state, like: the preferred
 * protocol version ( HTTP/1.1 or HTTP/2 ), whether to follow redirects, a
 * proxy, an authenticator, etc. Once built, an `HttpClient` is immutable,
 * and can be used to send multiple requests.
 *
 *  An `HttpClient` provides configuration information, and resource
 * sharing, for all requests sent through it. An `HttpClient` instance
 * typically manages its own pools of connections, which it may then reuse
 * as and when necessary. Connection pools are  typically not shared between
 * `HttpClient` instances. Creating a new client for each operation,
 * though possible, will usually prevent reusing such connections.
 *
 *  A {@link BodyHandler BodyHandler} must be supplied for each {@link
 * HttpRequest} sent. The `BodyHandler` determines how to handle the
 * response body, if any. Once an {@link HttpResponse} is received, the
 * headers, response code, and body (typically) are available. Whether the
 * response body bytes have been read or not depends on the type, `T`, of
 * the response body.
 *
 *  Requests can be sent either synchronously or asynchronously:
 * 
 *     {@link HttpClient#send(HttpRequest, BodyHandler)} blocks
 *     until the request has been sent and the response has been received.
 *
 *     {@link HttpClient#sendAsync(HttpRequest, BodyHandler)} sends the
 *     request and receives the response asynchronously. The `sendAsync`
 *     method returns immediately with a {@link CompletableFuture
 *     CompletableFuture}<{@link HttpResponse}>. The ` *     CompletableFuture` completes when the response becomes available. The
 *     returned `CompletableFuture` can be combined in different ways to
 *     declare dependencies among several asynchronous tasks.
 * 
 *
 * Synchronous Example
 * {@snippet :
 *   HttpClient client = HttpClient.newBuilder()
 *        .version(Version.HTTP_1_1)
 *        .followRedirects(Redirect.NORMAL)
 *        .connectTimeout(Duration.ofSeconds(20))
 *        .proxy(ProxySelector.of(new InetSocketAddress("proxy.example.com", 80)))
 *        .authenticator(Authenticator.getDefault())
 *        .build();
 *   HttpResponse response = client.send(request, BodyHandlers.ofString());
 *   System.out.println(response.statusCode());
 *   System.out.println(response.body());  }
 *
 * Asynchronous Example
 * {@snippet :
 *    HttpRequest request = HttpRequest.newBuilder()
 *        .uri(URI.create("https://foo.com/"))
 *        .timeout(Duration.ofMinutes(2))
 *        .header("Content-Type", "application/json")
 *        .POST(BodyPublishers.ofFile(Paths.get("file.json")))
 *        .build();
 *   client.sendAsync(request, BodyHandlers.ofString())
 *        .thenApply(HttpResponse::body)
 *        .thenAccept(System.out::println);  }
 *
 *  Security checks
 *
 *  If a security manager is present then security checks are performed by
 * the HTTP Client's sending methods. An appropriate {@link URLPermission} is
 * required to access the destination server, and proxy server if one has
 * been configured. The form of the `URLPermission` required to access a
 * proxy has a `method` parameter of `"CONNECT"` (for all kinds of
 * proxying) and a `URL` string of the form `"socket://host:port"`
 * where host and port specify the proxy's address.
 *
 * @apiNote
 * Resources allocated by the `HttpClient` may be
 * reclaimed early by {@linkplain #close() closing} the client.
 *
 * @implNote
 *  
 *  The JDK built-in implementation of the `HttpClient` overrides
 * {@link #close()}, {@link #shutdown()}, {@link #shutdownNow()},
 * {@link #awaitTermination(Duration)}, and {@link #isTerminated()} to
 * provide a best effort implementation. Failing to close, cancel, or
 * read returned streams to exhaustion, such as streams provided when using
 * {@link BodyHandlers#ofInputStream()}, {@link BodyHandlers#ofLines()}, or
 * {@link BodyHandlers#ofPublisher()}, may prevent requests submitted
 * before an {@linkplain #shutdown() orderly shutdown}
 * to run to completion. Likewise, failing to
 * {@linkplain Subscription#request(long) request data} or {@linkplain
 * Subscription#cancel() cancel subscriptions} from a custom {@linkplain
 * java.net.http.HttpResponse.BodySubscriber BodySubscriber} may stop
 * delivery of data and {@linkplain #awaitTermination(Duration) stall an
 * orderly shutdown}.
 *
 * 
 * If an explicit {@linkplain HttpClient.Builder#executor(Executor)
 * executor} has not been set for an `HttpClient`, and a security manager
 * has been installed, then the default executor will execute asynchronous and
 * dependent tasks in a context that is granted no permissions. Custom
 * {@linkplain HttpRequest.BodyPublisher request body publishers}, {@linkplain
 * HttpResponse.BodyHandler response body handlers}, {@linkplain
 * HttpResponse.BodySubscriber response body subscribers}, and {@linkplain
 * WebSocket.Listener WebSocket Listeners}, if executing operations that require
 * privileges, should do so within an appropriate {@linkplain
 * AccessController#doPrivileged(PrivilegedAction) privileged context}.
 *
 * @since 11
*/
export class HttpClient extends AutoCloseable {
  /**
   * Returns a new `HttpClient` with default settings.
   *
   *  Equivalent to `newBuilder().build()`.
   *
   *  The default settings include: the "GET" request method, a preference
   * of {@linkplain HttpClient.Version#HTTP_2 HTTP/2}, a redirection policy of
   * {@linkplain Redirect#NEVER NEVER}, the {@linkplain
   * ProxySelector#getDefault() default proxy selector}, and the {@linkplain
   * SSLContext#getDefault() default SSL context}.
   *
   * @implNote The system-wide default values are retrieved at the time the
   * `HttpClient` instance is constructed. Changing the system-wide
   * values after an `HttpClient` instance has been built, for
   * instance, by calling {@link ProxySelector#setDefault(ProxySelector)}
   * or {@link SSLContext#setDefault(SSLContext)}, has no effect on already
   * built instances.
   *
   * @return a new HttpClient
   * @throws UncheckedIOException if necessary underlying IO resources required to
   * {@linkplain Builder#build() build a new HttpClient} cannot be allocated.
  */
  static newHttpClient(): HttpClient;
  /**
   * Creates a new `HttpClient` builder.
   *
   *  Builders returned by this method create instances
   * of the default `HttpClient` implementation.
   *
   * @return an `HttpClient.Builder`
  */
  static newBuilder(): Builder;
  /**
   * Returns an `Optional` containing this client's {@link
   * CookieHandler}. If no `CookieHandler` was set in this client's
   * builder, then the `Optional` is empty.
   *
   * @return an `Optional` containing this client's `CookieHandler`
  */
  cookieHandler(): Optional<CookieHandler>;
  /**
   * Returns an `Optional` containing the connect timeout duration
   * for this client. If the {@linkplain Builder#connectTimeout(Duration)
   * connect timeout duration} was not set in the client's builder, then the
   * `Optional` is empty.
   *
   * @return an `Optional` containing this client's connect timeout
   *         duration
  */
  connectTimeout(): Optional<Duration>;
  /**
   * Returns the follow redirects policy for this client. The default value
   * for client's built by builders that do not specify a redirect policy is
   * {@link HttpClient.Redirect#NEVER NEVER}.
   *
   * @return this client's follow redirects setting
  */
  followRedirects(): Redirect;
  /**
   * Returns an `Optional` containing the `ProxySelector`
   * supplied to this client. If no proxy selector was set in this client's
   * builder, then the `Optional` is empty.
   *
   *  Even though this method may return an empty optional, the `     * HttpClient` may still have a non-exposed {@linkplain
   * Builder#proxy(ProxySelector) default proxy selector} that is
   * used for sending HTTP requests.
   *
   * @return an `Optional` containing the proxy selector supplied
   *        to this client.
  */
  proxy(): Optional<ProxySelector>;
  /**
   * Returns this client's `SSLContext`.
   *
   *  If no `SSLContext` was set in this client's builder, then the
   * {@linkplain SSLContext#getDefault() default context} is returned.
   *
   * @return this client's SSLContext
  */
  sslContext(): SSLContext;
  /**
   * Returns a copy of this client's {@link SSLParameters}.
   *
   *  If no `SSLParameters` were set in the client's builder, then an
   * implementation specific default set of parameters, that the client will
   * use, is returned.
   *
   * @return this client's `SSLParameters`
  */
  sslParameters(): SSLParameters;
  /**
   * Returns an `Optional` containing the {@link Authenticator} set on
   * this client. If no `Authenticator` was set in the client's builder,
   * then the `Optional` is empty.
   *
   * @return an `Optional` containing this client's `Authenticator`
  */
  authenticator(): Optional<Authenticator>;
  /**
   * Returns the preferred HTTP protocol version for this client. The default
   * value is {@link HttpClient.Version#HTTP_2}
   *
   * @implNote Constraints may also affect the selection of protocol version.
   * For example, if HTTP/2 is requested through a proxy, and if the
   * implementation does not support this mode, then HTTP/1.1 may be used
   *
   * @return the HTTP protocol version requested
  */
  version(): Version;
  /**
   * Returns an `Optional` containing this client's {@link
   * Executor}. If no `Executor` was set in the client's builder,
   * then the `Optional` is empty.
   *
   *  Even though this method may return an empty optional, the `     * HttpClient` may still have an non-exposed {@linkplain
   * HttpClient.Builder#executor(Executor) default executor} that is used for
   * executing asynchronous and dependent tasks.
   *
   * @return an `Optional` containing this client's `Executor`
  */
  executor(): Optional<Executor>;
  /**
   * Sends the given request using this client, blocking if necessary to get
   * the response. The returned {@link HttpResponse}`` contains the
   * response status, headers, and body ( as handled by given response body
   * handler ).
   *
   *  If the operation is interrupted, the default `HttpClient`
   * implementation attempts to cancel the HTTP exchange and
   * {@link InterruptedException} is thrown.
   * No guarantee is made as to exactly when the cancellation request
   * may be taken into account. In particular, the request might still get sent
   * to the server, as its processing might already have started asynchronously
   * in another thread, and the underlying resources may only be released
   * asynchronously.
   * 
   *     With HTTP/1.1, an attempt to cancel may cause the underlying
   *         connection to be closed abruptly.
   *     With HTTP/2, an attempt to cancel may cause the stream to be reset,
   *         or in certain circumstances, may also cause the connection to be
   *         closed abruptly, if, for instance, the thread is currently trying
   *         to write to the underlying socket.
   * 
   *
   * @param  the response body type
   * @param request the request
   * @param responseBodyHandler the response body handler
   * @return the response
   * @throws IOException if an I/O error occurs when sending or receiving, or
   *         the client has {@linkplain ##closing shut down}
   * @throws InterruptedException if the operation is interrupted
   * @throws IllegalArgumentException if the `request` argument is not
   *         a request that could have been validly built as specified by {@link
   *         HttpRequest.Builder HttpRequest.Builder}.
   * @throws SecurityException If a security manager has been installed
   *          and it denies {@link java.net.URLPermission access} to the
   *          URL in the given request, or proxy if one is configured.
   *          See security checks for further
   *          information.
  */
  send<T>(request: HttpRequest, responseBodyHandler: BodyHandler<T>): HttpResponse<T>;
  /**
   * Sends the given request asynchronously using this client with the given
   * response body handler.
   *
   *  Equivalent to: `sendAsync(request, responseBodyHandler, null)`.
   *
   * @param  the response body type
   * @param request the request
   * @param responseBodyHandler the response body handler
   * @return a `CompletableFuture>`
   * @throws IllegalArgumentException if the `request` argument is not
   *         a request that could have been validly built as specified by {@link
   *         HttpRequest.Builder HttpRequest.Builder}.
  */
  sendAsync<T>(request: HttpRequest, responseBodyHandler: BodyHandler<T>): CompletableFuture<HttpResponse<T>>;
  /**
   * Sends the given request asynchronously using this client with the given
   * response body handler and push promise handler.
   *
   *  The returned completable future, if completed successfully, completes
   * with an {@link HttpResponse}`` that contains the response status,
   * headers, and body ( as handled by given response body handler ).
   *
   *  {@linkplain PushPromiseHandler Push promises} received, if any, are
   * handled by the given `pushPromiseHandler`. A `null` valued
   * `pushPromiseHandler` rejects any push promises.
   *
   *  The returned completable future completes exceptionally with:
   * 
   * {@link IOException} - if an I/O error occurs when sending or receiving,
   *      or the client has {@linkplain ##closing shut down}.
   * {@link SecurityException} - If a security manager has been installed
   *          and it denies {@link java.net.URLPermission access} to the
   *          URL in the given request, or proxy if one is configured.
   *          See security checks for further
   *          information.
   * 
   *
   *  The default `HttpClient` implementation returns
   * `CompletableFuture` objects that are cancelable.
   * `CompletableFuture` objects {@linkplain CompletableFuture#newIncompleteFuture()
   * derived} from cancelable futures are themselves cancelable.
   * Invoking {@linkplain CompletableFuture#cancel(boolean) cancel(true)}
   * on a cancelable future that is not completed, attempts to cancel the HTTP exchange
   * in an effort to release underlying resources as soon as possible.
   * No guarantee is made as to exactly when the cancellation request
   * may be taken into account. In particular, the request might still get sent
   * to the server, as its processing might already have started asynchronously
   * in another thread, and the underlying resources may only be released
   * asynchronously.
   * 
   *     With HTTP/1.1, an attempt to cancel may cause the underlying connection
   *         to be closed abruptly.
   *     With HTTP/2, an attempt to cancel may cause the stream to be reset.
   * 
   *
   * @param  the response body type
   * @param request the request
   * @param responseBodyHandler the response body handler
   * @param pushPromiseHandler push promise handler, may be null
   * @return a `CompletableFuture>`
   * @throws IllegalArgumentException if the `request` argument is not
   *         a request that could have been validly built as specified by {@link
   *         HttpRequest.Builder HttpRequest.Builder}.
  */
  sendAsync<T>(request: HttpRequest, responseBodyHandler: BodyHandler<T>, pushPromiseHandler: PushPromiseHandler<T>): CompletableFuture<HttpResponse<T>>;
  /**
   * Creates a new `WebSocket` builder (optional operation).
   *
   *  Example
   * {@snippet :
   *   HttpClient client = HttpClient.newHttpClient();
   *   CompletableFuture ws = client.newWebSocketBuilder()
   *      .buildAsync(URI.create("ws://websocket.example.com"), listener);  }
   *
   *  Finer control over the WebSocket Opening Handshake can be achieved
   * by using a custom `HttpClient`.
   *
   *  Example
   * {@snippet :
   *   InetSocketAddress addr = new InetSocketAddress("proxy.example.com", 80);
   *   HttpClient client = HttpClient.newBuilder()
   *           .proxy(ProxySelector.of(addr))
   *           .build();
   *
   *   CompletableFuture ws = client.newWebSocketBuilder()
   *           .buildAsync(URI.create("ws://websocket.example.com"), listener);  }
   *
   * @implSpec The default implementation of this method throws
   * `UnsupportedOperationException`. Clients obtained through
   * {@link HttpClient#newHttpClient()} or {@link HttpClient#newBuilder()}
   * return a `WebSocket` builder.
   *
   * @implNote Both builder and `WebSocket`s created with it operate in
   * a non-blocking fashion. That is, their methods do not block before
   * returning a `CompletableFuture`. Asynchronous tasks are executed in
   * this `HttpClient`'s executor.
   *
   *  When a `CompletionStage` returned from
   * {@link WebSocket.Listener#onClose Listener.onClose} completes,
   * the `WebSocket` will send a Close message that has the same code
   * the received message has and an empty reason.
   *
   * @return a `WebSocket.Builder`
   * @throws UnsupportedOperationException
   *         if this `HttpClient` does not provide WebSocket support
  */
  newWebSocketBuilder(): java_net_http_WebSocket_Builder;
  /**
   * Initiates an orderly shutdown in which  requests previously
   * submitted with `send` or `sendAsync`
   * are run to completion, but no new request will be accepted.
   * Running a request to completion may involve running several
   * operations in the background, including {@linkplain ##closing
   * waiting for responses to be delivered}, which will all have to
   * run to completion until the request is considered completed.
   *
   * Invocation has no additional effect if already shut down.
   *
   * This method does not wait for previously submitted request
   * to complete execution.  Use {@link #awaitTermination(Duration)
   * awaitTermination} or {@link #close() close} to do that.
   *
   * @implSpec
   * The default implementation of this method does nothing. Subclasses should
   * override this method to implement the appropriate behavior.
   *
   * @see ##closing Implementation Note on closing the HttpClient
   *
   * @since 21
  */
  shutdown(): void;
  /**
   * Blocks until all operations have completed execution after a shutdown
   * request, or the `duration` elapses, or the current thread is
   * {@linkplain Thread#interrupt() interrupted}, whichever happens first.
   * Operations are any tasks required to run a request previously
   * submitted with `send` or `sendAsync` to completion.
   *
   *  This method does not wait if the duration to wait is less than or
   * equal to zero. In this case, the method just tests if the thread has
   * terminated.
   *
   * @implSpec
   * The default implementation of this method checks for null arguments, but
   * otherwise does nothing and returns true.
   * Subclasses should override this method to implement the proper behavior.
   *
   * @param duration the maximum time to wait
   * @return `true` if this client terminated and
   *         `false` if the timeout elapsed before termination
   * @throws InterruptedException if interrupted while waiting
   *
   * @see ##closing Implementation Note on closing the HttpClient
   *
   * @since 21
  */
  awaitTermination(duration: Duration): boolean;
  /**
   * Returns `true` if all operations have completed following
   * a shutdown.
   * Operations are any tasks required to run a request previously
   * submitted with `send` or `sendAsync` to completion.
   *  Note that `isTerminated` is never `true` unless
   * either `shutdown` or `shutdownNow` was called first.
   *
   * @implSpec
   * The default implementation of this method does nothing and returns false.
   * Subclasses should override this method to implement the proper behavior.
   *
   * @return `true` if all tasks have completed following a shutdown
   *
   * @see ##closing Implementation Note on closing the HttpClient
   *
   * @since 21
  */
  isTerminated(): boolean;
  /**
   * This method attempts to initiate an immediate shutdown.
   * An implementation of this method may attempt to
   * interrupt operations that are actively running.
   * Operations are any tasks required to run a request previously
   * submitted with `send` or `sendAsync` to completion.
   * The behavior of actively running operations when interrupted
   * is undefined. In particular, there is no guarantee that
   * interrupted operations will terminate, or that code waiting
   * on these operations will ever be notified.
   *
   * @implSpec
   * The default implementation of this method simply calls {@link #shutdown()}.
   * Subclasses should override this method to implement the appropriate
   * behavior.
   *
   * @see ##closing Implementation Note on closing the HttpClient
   *
   * @since 21
  */
  shutdownNow(): void;
  /**
   * Initiates an orderly shutdown in which  requests previously
   * submitted to `send` or `sendAsync`
   * are run to completion, but no new request will be accepted.
   * Running a request to completion may involve running several
   * operations in the background, including {@linkplain ##closing
   * waiting for responses to be delivered}.
   * This method waits until all operations have completed execution
   * and the client has terminated.
   *
   *  If interrupted while waiting, this method may attempt to stop all
   * operations by calling {@link #shutdownNow()}. It then continues to wait
   * until all actively executing operations have completed.
   * The interrupt status will be re-asserted before this method returns.
   *
   *  If already terminated, invoking this method has no effect.
   *
   * @implSpec
   * The default implementation invokes `shutdown()` and waits for tasks
   * to complete execution with `awaitTermination`.
   *
   * @see ##closing Implementation Note on closing the HttpClient
   *
   * @since 21
  */
  close(): void;
}
/**
 * Thrown when a response is not received within a specified time period.
 *
 * @since 11
*/
export class HttpTimeoutException extends IOException {
  /**
   * Constructs an `HttpTimeoutException` with the given detail message.
   *
   * @param message
   *        The detail message; can be `null`
  */
  constructor(message: string);
}
/**
 * An HTTP response.
 *
 *  An `HttpResponse` is not created directly, but rather returned as
 * a result of sending an {@link HttpRequest}. An `HttpResponse` is
 * made available when the response status code and headers have been received,
 * and typically after the response body has also been completely received.
 * Whether or not the `HttpResponse` is made available before the response
 * body has been completely received depends on the {@link BodyHandler
 * BodyHandler} provided when sending the `HttpRequest`.
 *
 *  This class provides methods for accessing the response status code,
 * headers, the response body, and the `HttpRequest` corresponding
 * to this response.
 *
 *  The following is an example of retrieving a response as a String:
 *
 * {@snippet :
 *     HttpResponse response = client
 *       .send(request, BodyHandlers.ofString()); }
 *
 *  The class {@link BodyHandlers BodyHandlers} provides implementations
 * of many common response handlers. Alternatively, a custom `BodyHandler`
 * implementation can be used.
 *
 * @param  the response body type
 * @since 11
*/
export class HttpResponse<T> {
  /**
   * Returns the status code for this response.
   *
   * @return the response code
  */
  statusCode(): number;
  /**
   * Returns the {@link HttpRequest} corresponding to this response.
   *
   *  The returned `HttpRequest` may not be the initiating request
   * provided when {@linkplain HttpClient#send(HttpRequest, BodyHandler)
   * sending}. For example, if the initiating request was redirected, then the
   * request returned by this method will have the redirected URI, which will
   * be different from the initiating request URI.
   *
   * @see #previousResponse()
   *
   * @return the request
  */
  request(): HttpRequest;
  /**
   * Returns an `Optional` containing the previous intermediate response
   * if one was received. An intermediate response is one that is received
   * as a result of redirection or authentication. If no previous response
   * was received then an empty `Optional` is returned.
   *
   * @return an Optional containing the HttpResponse, if any.
  */
  previousResponse(): Optional<HttpResponse<T>>;
  /**
   * Returns the received response headers.
   *
   * @return the response headers
  */
  headers(): HttpHeaders;
  /**
   * Returns the body. Depending on the type of `T`, the returned body
   * may represent the body after it was read (such as `byte[]`, or
   * `String`, or `Path`) or it may represent an object with
   * which the body is read, such as an {@link java.io.InputStream}.
   *
   *  If this `HttpResponse` was returned from an invocation of
   * {@link #previousResponse()} then this method returns `null`
   *
   * @return the body
  */
  body(): T;
  /**
   * Returns an {@link Optional} containing the {@link SSLSession} in effect
   * for this response. Returns an empty `Optional` if this is not a
   * HTTPS response.
   *
   * @return an `Optional` containing the `SSLSession` associated
   *         with the response
  */
  sslSession(): Optional<SSLSession>;
  /**
   * Returns the `URI` that the response was received from. This may be
   * different from the request `URI` if redirection occurred.
   *
   * @return the URI of the response
  */
  uri(): URI;
  /**
   * Returns the HTTP protocol version that was used for this response.
   *
   * @return HTTP protocol version
  */
  version(): Version;
}
/**
 * An HTTP request.
 *
 *  An `HttpRequest` instance is built through an `HttpRequest`
 * {@linkplain HttpRequest.Builder builder}. An `HttpRequest` builder
 * is obtained from one of the {@link HttpRequest#newBuilder(URI) newBuilder}
 * methods. A request's {@link URI}, headers, and body can be set. Request
 * bodies are provided through a {@link BodyPublisher BodyPublisher} supplied
 * to one of the {@link Builder#POST(BodyPublisher) POST},
 * {@link Builder#PUT(BodyPublisher) PUT} or
 * {@link Builder#method(String,BodyPublisher) method} methods.
 * Once all required parameters have been set in the builder, {@link
 * Builder#build() build} will return the `HttpRequest`. Builders can be
 * copied and modified many times in order to build multiple related requests
 * that differ in some parameters.
 *
 *  The following is an example of a GET request that prints the response
 * body as a String:
 *
 * {@snippet :
 *   HttpClient client = HttpClient.newHttpClient();
 *
 *   HttpRequest request = HttpRequest.newBuilder()
 *         .uri(URI.create("http://foo.com/"))
 *         .build();
 *
 *   client.sendAsync(request, BodyHandlers.ofString())
 *         .thenApply(HttpResponse::body)
 *         .thenAccept(System.out::println)
 *         .join(); }
 *
 * The class {@link BodyPublishers BodyPublishers} provides implementations
 * of many common publishers. Alternatively, a custom `BodyPublisher`
 * implementation can be used.
 *
 * @since 11
*/
export class HttpRequest {
  /**
   * Creates an `HttpRequest` builder with the given URI.
   *
   * @param uri the request URI
   * @return a new request builder
   * @throws IllegalArgumentException if the URI scheme is not supported.
  */
  static newBuilder(uri: URI): java_net_http_HttpRequest_Builder;
  /**
   * Creates a `Builder` whose initial state is copied from an existing
   * `HttpRequest`.
   *
   *  This builder can be used to build an `HttpRequest`, equivalent
   * to the original, while allowing amendment of the request state prior to
   * construction - for example, adding additional headers.
   *
   *  The `filter` is applied to each header name value pair as they
   * are copied from the given request. When completed, only headers that
   * satisfy the condition as laid out by the `filter` will be present
   * in the `Builder` returned from this method.
   *
   * @apiNote
   * The following scenarios demonstrate typical use-cases of the filter.
   * Given an `HttpRequest` request:
   * 
   * 
   *   Retain all headers:
   *  {@snippet :
   *  HttpRequest.newBuilder(request, (n, v) -> true) }
   *
   *   Remove all headers:
   *  {@snippet :
   *  HttpRequest.newBuilder(request, (n, v) -> false) }
   *
   *   Remove a particular header (e.g. Foo-Bar):
   *  {@snippet :
   *  HttpRequest.newBuilder(request, (name, value) -> !name.equalsIgnoreCase("Foo-Bar")) }
   * 
   *
   * @param request the original request
   * @param filter a header filter
   * @return a new request builder
   * @throws IllegalArgumentException if a new builder cannot be seeded from
   *         the given request (for instance, if the request contains illegal
   *         parameters)
   * @since 16
  */
  static newBuilder(request: HttpRequest, filter: BiPredicate<string,string>): java_net_http_HttpRequest_Builder;
  /**
   * Creates an `HttpRequest` builder.
   *
   * @return a new request builder
  */
  static newBuilder(): java_net_http_HttpRequest_Builder;
  /**
   * Returns an `Optional` containing the {@link BodyPublisher} set on
   * this request. If no `BodyPublisher` was set in the requests's
   * builder, then the `Optional` is empty.
   *
   * @return an `Optional` containing this request's `BodyPublisher`
  */
  bodyPublisher(): Optional<BodyPublisher>;
  /**
   * Returns the request method for this request. If not set explicitly,
   * the default method for any request is "GET".
   *
   * @return this request's method
  */
  method(): string;
  /**
   * Returns an `Optional` containing this request's timeout duration.
   * If the timeout duration was not set in the request's builder, then the
   * `Optional` is empty.
   *
   * @return an `Optional` containing this request's timeout duration
  */
  timeout(): Optional<Duration>;
  /**
   * Returns this request's {@linkplain HttpRequest.Builder#expectContinue(boolean)
   * expect continue} setting.
   *
   * @return this request's expect continue setting
  */
  expectContinue(): boolean;
  /**
   * Returns this request's `URI`.
   *
   * @return this request's URI
  */
  uri(): URI;
  /**
   * Returns an `Optional` containing the HTTP protocol version that
   * will be requested for this `HttpRequest`. If the version was not
   * set in the request's builder, then the `Optional` is empty.
   * In that case, the version requested will be that of the sending
   * {@link HttpClient}. The corresponding {@link HttpResponse} should be
   * queried to determine the version that was actually used.
   *
   * @return HTTP protocol version
  */
  version(): Optional<Version>;
  /**
   * The (user-accessible) request headers that this request was (or will be)
   * sent with.
   *
   * @return this request's HttpHeaders
  */
  headers(): HttpHeaders;
  /**
   * Tests this HTTP request instance for equality with the given object.
   *
   *  If the given object is not an `HttpRequest` then this
   * method returns `false`. Two HTTP requests are equal if their URI,
   * method, and headers fields are all equal.
   *
   *  This method satisfies the general contract of the {@link
   * Object#equals(Object) Object.equals} method.
   *
   * @param obj the object to which this object is to be compared
   * @return `true` if, and only if, the given object is an `     *         HttpRequest` that is equal to this HTTP request
  */
  equals(obj: any): boolean;
  /**
   * Computes a hash code for this HTTP request instance.
   *
   *  The hash code is based upon the HTTP request's URI, method, and
   * header components, and satisfies the general contract of the
   * {@link Object#hashCode Object.hashCode} method.
   *
   * @return the hash-code value for this HTTP request
  */
  hashCode(): number;
}
/**
 * A read-only view of a set of HTTP headers.
 *
 *  An `HttpHeaders` is not typically created directly, but rather
 * returned from an {@link HttpRequest#headers() HttpRequest} or an
 * {@link HttpResponse#headers() HttpResponse}. Specific HTTP headers can be
 * set for a {@linkplain HttpRequest request} through one of the request
 * builder's {@link HttpRequest.Builder#header(String, String) headers} methods.
 *
 *  The methods of this class ( that accept a String header name ), and the
 * `Map` returned by the {@link #map() map} method, operate without regard
 * to case when retrieving the header value(s).
 *
 *  An HTTP header name may appear more than once in the HTTP protocol. As
 * such, headers are represented as a name and a list of values. Each occurrence
 * of a header value is added verbatim, to the appropriate header name list,
 * without interpreting its value. In particular, `HttpHeaders` does not
 * perform any splitting or joining of comma separated header value strings. The
 * order of elements in a header value list is preserved when {@link
 * HttpRequest.Builder#header(String, String) building} a request. For
 * responses, the order of elements in a header value list is the order in which
 * they were received. The `Map` returned by the `map` method,
 * however, does not provide any guarantee with regard to the ordering of its
 * entries.
 *
 *  `HttpHeaders` instances are immutable.
 *
 * @since 11
*/
export class HttpHeaders {
  /**
   * Returns an {@link Optional} containing the first header string value of
   * the given named (and possibly multi-valued) header. If the header is not
   * present, then the returned `Optional` is empty.
   *
   * @param name the header name
   * @return an `Optional` containing the first named header
   *         string value, if present
  */
  firstValue(name: string): Optional<string>;
  /**
   * Returns an {@link OptionalLong} containing the first header string value
   * of the named header field. If the header is not present, then the
   * Optional is empty. If the header is present but contains a value that
   * does not parse as a `Long` value, then an exception is thrown.
   *
   * @param name the header name
   * @return  an `OptionalLong`
   * @throws NumberFormatException if a value is found, but does not parse as
   *                               a Long
  */
  firstValueAsLong(name: string): OptionalLong;
  /**
   * Returns an unmodifiable List of all of the header string values of the
   * given named header. Always returns a List, which may be empty if the
   * header is not present.
   *
   * @param name the header name
   * @return a List of headers string values
  */
  allValues(name: string): string[];
  /**
   * Returns an unmodifiable multi Map view of this HttpHeaders.
   *
   * @return the Map
  */
  map(): Map<string,string[]>;
  /**
   * Tests this HTTP headers instance for equality with the given object.
   *
   *  If the given object is not an `HttpHeaders` then this
   * method returns `false`. Two HTTP headers are equal if each
   * of their corresponding {@linkplain #map() maps} are equal.
   *
   *  This method satisfies the general contract of the {@link
   * Object#equals(Object) Object.equals} method.
   *
   * @param obj the object to which this object is to be compared
   * @return `true` if, and only if, the given object is an `     *         HttpHeaders` that is equal to this HTTP headers
  */
  equals(obj: any): boolean;
  /**
   * Computes a hash code for this HTTP headers instance.
   *
   *  The hash code is based upon the components of the HTTP headers
   * {@link #map() map}, and satisfies the general contract of the
   * {@link Object#hashCode Object.hashCode} method.
   *
   * @return the hash-code value for this HTTP headers
  */
  hashCode(): number;
  /**
   * Returns this HTTP headers as a string.
   *
   * @return a string describing the HTTP headers
  */
  toString(): string;
  /**
   * Returns an HTTP headers from the given map. The given map's key
   * represents the header name, and its value the list of string header
   * values for that header name.
   *
   *  An HTTP header name may appear more than once in the HTTP protocol.
   * Such, multi-valued, headers must be represented by a single entry
   * in the given map, whose entry value is a list that represents the
   * multiple header string values. Leading and trailing whitespaces are
   * removed from all string values retrieved from the given map and its lists
   * before processing. Only headers that, after filtering, contain at least
   * one, possibly empty string, value will be added to the HTTP headers.
   *
   * @apiNote The primary purpose of this method is for testing frameworks.
   * Per-request headers can be set through one of the `HttpRequest`
   * {@link HttpRequest.Builder#header(String, String) headers} methods.
   *
   * @param headerMap the map containing the header names and values
   * @param filter a filter that can be used to inspect each
   *               header-name-and-value pair in the given map to determine if
   *               it should, or should not, be added to the to the HTTP
   *               headers
   * @return an HTTP headers instance containing the given headers
   * @throws NullPointerException if any of: `headerMap`, a key or value
   *        in the given map, or an entry in the map's value list, or
   *        `filter`, is `null`
   * @throws IllegalArgumentException if the given `headerMap` contains
   *         any two keys that are equal ( without regard to case ); or if the
   *         given map contains any key whose length, after trimming
   *         whitespaces, is `0`
  */
  static of(headerMap: Map<string,string[]>, filter: BiPredicate<string,string>): HttpHeaders;
}

}
declare module 'java.net.http.HttpClient' {
import { Duration } from 'java.time';
import { Enum } from 'java.lang';
import { ProxySelector, InetAddress, Authenticator, CookieHandler } from 'java.net';
import { Executor } from 'java.util.concurrent';
import { HttpClient } from 'java.net.http';
import { SSLParameters, SSLContext } from 'javax.net.ssl';
/**
 * A builder of {@linkplain HttpClient HTTP Clients}.
 *
 *  Builders are created by invoking {@link HttpClient#newBuilder()
 * newBuilder}. Each of the setter methods modifies the state of the builder
 * and returns the same instance. Builders are not thread-safe and should not be
 * used concurrently from multiple threads without external synchronization.
 *
 * @since 11
*/
export class Builder {
  /**
   * A proxy selector that always return {@link Proxy#NO_PROXY} implying
   * a direct connection.
   *
   *  This is a convenience object that can be passed to
   * {@link #proxy(ProxySelector)} in order to build an instance of
   * {@link HttpClient} that uses no proxy.
  */
  static readonly NO_PROXY: ProxySelector;
  /**
   * Sets a cookie handler.
   *
   * @param cookieHandler the cookie handler
   * @return this builder
  */
  cookieHandler(cookieHandler: CookieHandler): Builder;
  /**
   * Sets the connect timeout duration for this client.
   *
   *  In the case where a new connection needs to be established, if
   * the connection cannot be established within the given `         * duration`, then {@link HttpClient#send(HttpRequest,BodyHandler)
   * HttpClient::send} throws an {@link HttpConnectTimeoutException}, or
   * {@link HttpClient#sendAsync(HttpRequest,BodyHandler)
   * HttpClient::sendAsync} completes exceptionally with an
   * `HttpConnectTimeoutException`. If a new connection does not
   * need to be established, for example if a connection can be reused
   * from a previous request, then this timeout duration has no effect.
   *
   * @param duration the duration to allow the underlying connection to be
   *                 established
   * @return this builder
   * @throws IllegalArgumentException if the duration is non-positive
  */
  connectTimeout(duration: Duration): Builder;
  /**
   * Sets an `SSLContext`.
   *
   *  If this method is not invoked prior to {@linkplain #build()
   * building}, then newly built clients will use the {@linkplain
   * SSLContext#getDefault() default context}, which is normally adequate
   * for client applications that do not need to specify protocols, or
   * require client authentication.
   *
   * @param sslContext the SSLContext
   * @return this builder
  */
  sslContext(sslContext: SSLContext): Builder;
  /**
   * Sets an `SSLParameters`.
   *
   *  If this method is not invoked prior to {@linkplain #build()
   * building}, then newly built clients will use a default,
   * implementation specific, set of parameters.
   *
   *  Some parameters which are used internally by the HTTP Client
   * implementation (such as the application protocol list) should not be
   * set by callers, as they may be ignored. The contents of the given
   * object are copied.
   *
   * @param sslParameters the SSLParameters
   * @return this builder
  */
  sslParameters(sslParameters: SSLParameters): Builder;
  /**
   * Sets the executor to be used for asynchronous and dependent tasks.
   *
   *  If this method is not invoked prior to {@linkplain #build()
   * building}, a default executor is created for each newly built `         * HttpClient`.
   *
   * @implNote The default executor uses a thread pool, with a custom
   * thread factory. If a security manager has been installed, the thread
   * factory creates threads that run with an access control context that
   * has no permissions.
   *
   * @param executor the Executor
   * @return this builder
  */
  executor(executor: Executor): Builder;
  /**
   * Specifies whether requests will automatically follow redirects issued
   * by the server.
   *
   *  If this method is not invoked prior to {@linkplain #build()
   * building}, then newly built clients will use a default redirection
   * policy of {@link Redirect#NEVER NEVER}.
   *
   * @param policy the redirection policy
   * @return this builder
  */
  followRedirects(policy: Redirect): Builder;
  /**
   * Requests a specific HTTP protocol version where possible.
   *
   *  If this method is not invoked prior to {@linkplain #build()
   * building}, then newly built clients will prefer {@linkplain
   * Version#HTTP_2 HTTP/2}.
   *
   *  If set to {@linkplain Version#HTTP_2 HTTP/2}, then each request
   * will attempt to upgrade to HTTP/2. If the upgrade succeeds, then the
   * response to this request will use HTTP/2 and all subsequent requests
   * and responses to the same
   * origin server
   * will use HTTP/2. If the upgrade fails, then the response will be
   * handled using HTTP/1.1
   *
   * @implNote Constraints may also affect the selection of protocol version.
   * For example, if HTTP/2 is requested through a proxy, and if the implementation
   * does not support this mode, then HTTP/1.1 may be used
   *
   * @param version the requested HTTP protocol version
   * @return this builder
  */
  version(version: Version): Builder;
  /**
   * Sets the default priority for any HTTP/2 requests sent from this
   * client. The value provided must be between `1` and `256`
   * (inclusive).
   *
   * @param priority the priority weighting
   * @return this builder
   * @throws IllegalArgumentException if the given priority is out of range
  */
  priority(priority: number): Builder;
  /**
   * Sets a {@link java.net.ProxySelector}.
   *
   * @apiNote {@link ProxySelector#of(InetSocketAddress) ProxySelector::of}
   * provides a `ProxySelector` which uses a single proxy for all
   * requests. The system-wide proxy selector can be retrieved by
   * {@link ProxySelector#getDefault()}.
   *
   * @implNote
   * If this method is not invoked prior to {@linkplain #build() building},
   * then newly built clients will use the {@linkplain
   * ProxySelector#getDefault() default proxy selector}, which is usually
   * adequate for client applications. The default proxy selector supports
   * a set of system properties related to
   * 
   * proxy settings. This default behavior can be disabled by
   * supplying an explicit proxy selector, such as {@link #NO_PROXY} or
   * one returned by {@link ProxySelector#of(InetSocketAddress)
   * ProxySelector::of}, before {@linkplain #build() building}.
   *
   * @param proxySelector the ProxySelector
   * @return this builder
  */
  proxy(proxySelector: ProxySelector): Builder;
  /**
   * Sets an authenticator to use for HTTP authentication.
   *
   * @param authenticator the Authenticator
   * @return this builder
  */
  authenticator(authenticator: Authenticator): Builder;
  /**
   * Binds the socket to this local address when creating
   * connections for sending requests.
   *
   *  If no local address is set or `null` is passed
   * to this method then sockets created by the
   * HTTP client will be bound to an automatically
   * assigned socket address.
   *
   *  Common usages of the `HttpClient` do not require
   * this method to be called. Setting a local address, through this
   * method, is only for advanced usages where users of the `HttpClient`
   * require specific control on which network interface gets used
   * for the HTTP communication. Callers of this method are expected to
   * be aware of the networking configurations of the system where the
   * `HttpClient` will be used and care should be taken to ensure the
   * correct `localAddr` is passed. Failure to do so can result in
   * requests sent through the `HttpClient` to fail.
   *
   * @implSpec The default implementation of this method throws
   * `UnsupportedOperationException`. `Builder`s obtained
   * through {@link HttpClient#newBuilder()} provide an implementation
   * of this method that allows setting the local address.
   *
   * @param localAddr The local address of the socket. Can be null.
   * @return this builder
   * @throws UnsupportedOperationException if this builder doesn't support
   *         configuring a local address or if the passed `localAddr`
   *         is not supported by this `HttpClient` implementation.
   * @since 19
  */
  localAddress(localAddr: InetAddress): Builder;
  /**
   * Returns a new {@link HttpClient} built from the current state of this
   * builder.
   *
   * @implSpec If the {@link #localAddress(InetAddress) local address} is a non-null
   * address and a security manager is installed, then
   * this method calls {@link SecurityManager#checkListen checkListen} to check that
   * the caller has necessary permission to bind to that local address.
   *
   * @return a new `HttpClient`
   *
   * @throws UncheckedIOException may be thrown if underlying IO resources required
   * by the implementation cannot be allocated. For instance,
   * if the implementation requires a {@link Selector}, and opening
   * one fails due to {@linkplain Selector#open() lack of necessary resources}.
   * @throws SecurityException If a security manager has been installed and the
   *         security manager's {@link SecurityManager#checkListen checkListen}
   *         method disallows binding to the given address.
  */
  build(): HttpClient;
}
/**
 * The HTTP protocol version.
 *
 * @since 11
*/
export class Version extends Enum<Version> {
  /**
   * HTTP version 1.1
  */
  static readonly HTTP_1_1: Version;
  /**
   * HTTP version 2
  */
  static readonly HTTP_2: Version;
  static valueOf(name: string): Version;
  static values(): Version[];
}
/**
 * Defines the automatic redirection policy.
 *
 *  The automatic redirection policy is checked whenever a `3XX`
 * response code is received. If redirection does not happen automatically,
 * then the response, containing the  `3XX` response code, is returned,
 * where it can be handled manually.
 *
 *  `Redirect` policy is set through the {@linkplain
 * HttpClient.Builder#followRedirects(Redirect) Builder.followRedirects}
 * method.
 *
 * @implNote When automatic redirection occurs, the request method of the
 * redirected request may be modified depending on the specific `30X`
 * status code, as specified in 
 * RFC 7231. In addition, the `301` and `302` status codes
 * cause a `POST` request to be converted to a `GET` in the
 * redirected request.
 *
 * @since 11
*/
export class Redirect extends Enum<Redirect> {
  /**
   * Never redirect.
  */
  static readonly NEVER: Redirect;
  /**
   * Always redirect.
  */
  static readonly ALWAYS: Redirect;
  /**
   * Always redirect, except from HTTPS URLs to HTTP URLs.
  */
  static readonly NORMAL: Redirect;
  static valueOf(name: string): Redirect;
  static values(): Redirect[];
}

}
declare module 'java.net.http.HttpRequest' {
import { Duration } from 'java.time';
import { Iterable } from 'java.lang';
import { URI } from 'java.net';
import { InputStream } from 'java.io';
import { Publisher } from 'java.util.concurrent.Flow';
import { HttpRequest } from 'java.net.http';
import { ByteBuffer } from 'java.nio';
import { Version } from 'java.net.http.HttpClient';
import { Supplier } from 'java.util.function';
import { Path } from 'java.nio.file';
import { Charset } from 'java.nio.charset';
/**
 * A builder of {@linkplain HttpRequest HTTP requests}.
 *
 *  Instances of `HttpRequest.Builder` are created by calling
 * {@link HttpRequest#newBuilder()}, {@link HttpRequest#newBuilder(URI)},
 * or {@link HttpRequest#newBuilder(HttpRequest, BiPredicate)}.
 *
 *  The builder can be used to configure per-request state, such as: the
 * request URI, the request method (default is GET unless explicitly set),
 * specific request headers, etc. Each of the setter methods modifies the
 * state of the builder and returns the same instance. The methods are not
 * synchronized and should not be called from multiple threads without
 * external synchronization. The {@link #build() build} method returns a new
 * `HttpRequest` each time it is invoked. Once built an `     * HttpRequest` is immutable, and can be sent multiple times.
 *
 *  Note, that not all request headers may be set by user code. Some are
 * restricted for security reasons and others such as the headers relating
 * to authentication, redirection and cookie management may be managed by
 * specific APIs rather than through directly user set headers.
 *
 * @since 11
*/
export class Builder {
  /**
   * Sets this `HttpRequest`'s request `URI`.
   *
   * @param uri the request URI
   * @return this builder
   * @throws IllegalArgumentException if the `URI` scheme is not
   *         supported
  */
  uri(uri: URI): Builder;
  /**
   * Requests the server to acknowledge the request before sending the
   * body. This is disabled by default. If enabled, the server is
   * requested to send an error response or a `100 Continue`
   * response before the client sends the request body. This means the
   * request publisher for the request will not be invoked until this
   * interim response is received.
   *
   * @param enable `true` if Expect continue to be sent
   * @return this builder
  */
  expectContinue(enable: boolean): Builder;
  /**
   * Sets the preferred {@link HttpClient.Version} for this request.
   *
   *  The corresponding {@link HttpResponse} should be checked for the
   * version that was actually used. If the version is not set in a
   * request, then the version requested will be that of the sending
   * {@link HttpClient}.
   *
   * @param version the HTTP protocol version requested
   * @return this builder
  */
  version(version: Version): Builder;
  /**
   * Adds the given name value pair to the set of headers for this request.
   * The given value is added to the list of values for that name.
   *
   * @implNote An implementation may choose to restrict some header names
   *           or values, as the HTTP Client may determine their value itself.
   *           For example, "Content-Length", which will be determined by
   *           the request Publisher. In such a case, an implementation of
   *           `HttpRequest.Builder` may choose to throw an
   *           `IllegalArgumentException` if such a header is passed
   *           to the builder.
   *
   * @param name the header name
   * @param value the header value
   * @return this builder
   * @throws IllegalArgumentException if the header name or value is not
   *         valid, see 
   *         RFC 7230 section-3.2, or the header name or value is restricted
   *         by the implementation.
  */
  header(name: string, value: string): Builder;
  /**
   * Adds the given name value pairs to the set of headers for this
   * request. The supplied `String` instances must alternate as
   * header names and header values.
   * To add several values to the same name then the same name must
   * be supplied with each new value.
   *
   * @param headers the list of name value pairs
   * @return this builder
   * @throws IllegalArgumentException if there are an odd number of
   *         parameters, or if a header name or value is not valid, see
   *         
   *         RFC 7230 section-3.2, or a header name or value is
   *         {@linkplain #header(String, String) restricted} by the
   *         implementation.
  */
  headers(...headers: string[]): Builder;
  /**
   * Sets a timeout for this request. If the response is not received
   * within the specified timeout then an {@link HttpTimeoutException} is
   * thrown from {@link HttpClient#send(java.net.http.HttpRequest,
   * java.net.http.HttpResponse.BodyHandler) HttpClient::send} or
   * {@link HttpClient#sendAsync(java.net.http.HttpRequest,
   * java.net.http.HttpResponse.BodyHandler) HttpClient::sendAsync}
   * completes exceptionally with an `HttpTimeoutException`. The effect
   * of not setting a timeout is the same as setting an infinite Duration,
   * i.e. block forever.
   *
   * @param duration the timeout duration
   * @return this builder
   * @throws IllegalArgumentException if the duration is non-positive
  */
  timeout(duration: Duration): Builder;
  /**
   * Sets the given name value pair to the set of headers for this
   * request. This overwrites any previously set values for name.
   *
   * @param name the header name
   * @param value the header value
   * @return this builder
   * @throws IllegalArgumentException if the header name or value is not valid,
   *         see 
   *         RFC 7230 section-3.2, or the header name or value is
   *         {@linkplain #header(String, String) restricted} by the
   *         implementation.
  */
  setHeader(name: string, value: string): Builder;
  /**
   * Sets the request method of this builder to GET.
   * This is the default.
   *
   * @return this builder
  */
  GET(): Builder;
  /**
   * Sets the request method of this builder to POST and sets its
   * request body publisher to the given value.
   *
   * @param bodyPublisher the body publisher
   *
   * @return this builder
  */
  POST(bodyPublisher: BodyPublisher): Builder;
  /**
   * Sets the request method of this builder to PUT and sets its
   * request body publisher to the given value.
   *
   * @param bodyPublisher the body publisher
   *
   * @return this builder
  */
  PUT(bodyPublisher: BodyPublisher): Builder;
  /**
   * Sets the request method of this builder to DELETE.
   *
   * @return this builder
  */
  DELETE(): Builder;
  /**
   * Sets the request method of this builder to HEAD.
   *
   * @implSpec The default implementation is expected to have the same behaviour as:
   * `return method("HEAD", BodyPublishers.noBody());`
   *
   * @return this builder
   * @since 18
  */
  HEAD(): Builder;
  /**
   * Sets the request method and request body of this builder to the
   * given values.
   *
   * @apiNote The {@link BodyPublishers#noBody() noBody} request
   * body publisher can be used where no request body is required or
   * appropriate. Whether a method is restricted, or not, is
   * implementation specific. For example, some implementations may choose
   * to restrict the `CONNECT` method.
   *
   * @param method the method to use
   * @param bodyPublisher the body publisher
   * @return this builder
   * @throws IllegalArgumentException if the method name is not
   *         valid, see 
   *         RFC 7230 section-3.1.1, or the method is restricted by the
   *         implementation.
  */
  method(method: string, bodyPublisher: BodyPublisher): Builder;
  /**
   * Builds and returns an {@link HttpRequest}.
   *
   * @implSpec This method returns a new `HttpRequest` each time it is
   * invoked. Once built, the `HttpRequest` is immutable and can be
   * sent multiple times.
   *
   * @return a new `HttpRequest`
   * @throws IllegalStateException if a URI has not been set
  */
  build(): HttpRequest;
  /**
   * Returns an exact duplicate copy of this `Builder` based on
   * current state. The new builder can then be modified independently of
   * this builder.
   *
   * @return an exact copy of this builder
  */
  copy(): Builder;
}
/**
 * A `BodyPublisher` converts high-level Java objects into a flow of
 * byte buffers suitable for sending as a request body.  The class
 * {@link BodyPublishers BodyPublishers} provides implementations of many
 * common publishers.
 *
 *  The `BodyPublisher` interface extends {@link Flow.Publisher
 * Flow.Publisher<ByteBuffer>}, which means that a `BodyPublisher`
 * acts as a publisher of {@linkplain ByteBuffer byte buffers}.
 *
 *  When sending a request that contains a body, the HTTP Client
 * subscribes to the request's `BodyPublisher` in order to receive the
 * flow of outgoing request body data. The normal semantics of {@link
 * Flow.Subscriber} and {@link Flow.Publisher} are implemented by the HTTP
 * Client and are expected from `BodyPublisher` implementations. Each
 * outgoing request results in one HTTP Client `Subscriber`
 * subscribing to the `BodyPublisher` in order to provide the sequence
 * of byte buffers containing the request body. Instances of `     * ByteBuffer` published by the publisher must be allocated by the
 * publisher, and must not be accessed after being published to the HTTP
 * Client. These subscriptions complete normally when the request body is
 * fully sent, and can be canceled or terminated early through error. If a
 * request needs to be resent for any reason, then a new subscription is
 * created which is expected to generate the same data as before.
 *
 *  A `BodyPublisher` that reports a {@linkplain #contentLength()
 * content length} of `0` may not be subscribed to by the HTTP Client,
 * as it has effectively no data to publish.
 *
 * @see BodyPublishers
 * @since 11
*/
export class BodyPublisher extends Publisher<ByteBuffer> {
  /**
   * Returns the content length for this request body. May be zero
   * if no request body being sent, greater than zero for a fixed
   * length content, or less than zero for an unknown content length.
   *
   *  This method may be invoked before the publisher is subscribed to.
   * This method may be invoked more than once by the HTTP client
   * implementation, and MUST return the same constant value each time.
   *
   * @return the content length for this request body, if known
  */
  contentLength(): number;
}
/**
 * Implementations of {@link BodyPublisher BodyPublisher} that implement
 * various useful publishers, such as publishing the request body from a
 * String, or from a file.
 *
 *  The following are examples of using the predefined body publishers to
 * convert common high-level Java objects into a flow of data suitable for
 * sending as a request body:
 *
 * {@snippet :
 *   // Request body from a String
 *   HttpRequest request = HttpRequest.newBuilder()
 *        .uri(URI.create("https://foo.com/"))
 *        .header("Content-Type", "text/plain; charset=UTF-8")
 *        .POST(BodyPublishers.ofString("some body text"))
 *        .build(); }
 *
 * {@snippet :
 *   // Request body from a File
 *   HttpRequest request = HttpRequest.newBuilder()
 *        .uri(URI.create("https://foo.com/"))
 *        .header("Content-Type", "application/json")
 *        .POST(BodyPublishers.ofFile(Paths.get("file.json")))
 *        .build(); }
 *
 * {@snippet :
 *   // Request body from a byte array
 *   HttpRequest request = HttpRequest.newBuilder()
 *        .uri(URI.create("https://foo.com/"))
 *        .POST(BodyPublishers.ofByteArray(new byte[] { ... }))
 *        .build(); }
 *
 * @since 11
*/
export class BodyPublishers {
  /**
   * Returns a request body publisher whose body is retrieved from the
   * given `Flow.Publisher`. The returned request body publisher
   * has an unknown content length.
   *
   * @apiNote This method can be used as an adapter between `         * BodyPublisher` and `Flow.Publisher`, where the amount of
   * request body that the publisher will publish is unknown.
   *
   * @param publisher the publisher responsible for publishing the body
   * @return a BodyPublisher
  */
  static fromPublisher(publisher: Publisher<ByteBuffer>): BodyPublisher;
  /**
   * Returns a request body publisher whose body is retrieved from the
   * given `Flow.Publisher`. The returned request body publisher
   * has the given content length.
   *
   *  The given `contentLength` is a positive number, that
   * represents the exact amount of bytes the `publisher` must
   * publish.
   *
   * @apiNote This method can be used as an adapter between `         * BodyPublisher` and `Flow.Publisher`, where the amount of
   * request body that the publisher will publish is known.
   *
   * @param publisher the publisher responsible for publishing the body
   * @param contentLength a positive number representing the exact
   *                      amount of bytes the publisher will publish
   * @throws IllegalArgumentException if the content length is
   *                                  non-positive
   * @return a BodyPublisher
  */
  static fromPublisher(publisher: Publisher<ByteBuffer>, contentLength: number): BodyPublisher;
  /**
   * Returns a request body publisher whose body is the given `         * String`, converted using the {@link StandardCharsets#UTF_8 UTF_8}
   * character set.
   *
   * @param body the String containing the body
   * @return a BodyPublisher
  */
  static ofString(body: string): BodyPublisher;
  /**
   * Returns a request body publisher whose body is the given `         * String`, converted using the given character set.
   *
   * @param s the String containing the body
   * @param charset the character set to convert the string to bytes
   * @return a BodyPublisher
  */
  static ofString(s: string, charset: Charset): BodyPublisher;
  static ofInputStream(streamSupplier: Supplier<InputStream>): BodyPublisher;
  /**
   * Returns a request body publisher whose body is the given byte array.
   *
   * @param buf the byte array containing the body
   * @return a BodyPublisher
  */
  static ofByteArray(buf: number[]): BodyPublisher;
  /**
   * Returns a request body publisher whose body is the content of the
   * given byte array of `length` bytes starting from the specified
   * `offset`.
   *
   * @param buf the byte array containing the body
   * @param offset the offset of the first byte
   * @param length the number of bytes to use
   * @return a BodyPublisher
   * @throws IndexOutOfBoundsException if the sub-range is defined to be
   *                                   out of bounds
  */
  static ofByteArray(buf: number[], offset: number, length: number): BodyPublisher;
  /**
   * A request body publisher that takes data from the contents of a File.
   *
   *  Security manager permission checks are performed in this factory
   * method, when the `BodyPublisher` is created. Care must be taken
   * that the `BodyPublisher` is not shared with untrusted code.
   *
   * @param  path the path to the file containing the body
   * @return a BodyPublisher
   * @throws java.io.FileNotFoundException if the path is not found
   * @throws SecurityException if
   *         {@linkplain Files#newInputStream(Path, OpenOption...)
   *         opening the file for reading} is denied:
   *         in the case of the system-default file system provider,
   *         and a security manager is installed,
   *         {@link SecurityManager#checkRead(String) checkRead}
   *         is invoked to check read access to the given file
  */
  static ofFile(path: Path): BodyPublisher;
  /**
   * A request body publisher that takes data from an `Iterable`
   * of byte arrays. An {@link Iterable} is provided which supplies
   * {@link Iterator} instances. Each attempt to send the request results
   * in one invocation of the `Iterable`.
   *
   * @param iter an Iterable of byte arrays
   * @return a BodyPublisher
  */
  static ofByteArrays(iter: Iterable<number[]>): BodyPublisher;
  /**
   * A request body publisher which sends no request body.
   *
   * @return a BodyPublisher which completes immediately and sends
   *         no request body.
  */
  static noBody(): BodyPublisher;
  /**
   * Returns a `BodyPublisher` that publishes a request
   * body consisting of the concatenation of the request bodies
   * published by a sequence of publishers.
   *
   *  If the sequence is empty an {@linkplain #noBody() empty} publisher
   * is returned. Otherwise, if the sequence contains a single element,
   * that publisher is returned. Otherwise a concatenation publisher
   * is returned.
   *
   *  The request body published by a concatenation publisher
   * is logically equivalent to the request body that would have
   * been published by concatenating all the bytes of each publisher
   * in sequence.
   *
   *  Each publisher is lazily subscribed to in turn,
   * until all the body bytes are published, an error occurs, or the
   * concatenation publisher's subscription is cancelled.
   * The concatenation publisher may be subscribed to more than once,
   * which in turn may result in the publishers in the sequence being
   * subscribed to more than once.
   *
   *  The concatenation publisher has a known content
   * length only if all publishers in the sequence have a known content
   * length. The {@link BodyPublisher#contentLength() contentLength}
   * reported by the concatenation publisher is computed as follows:
   * 
   *      If any of the publishers reports an {@linkplain
   *         BodyPublisher#contentLength() unknown} content length,
   *         or if the sum of the known content lengths would exceed
   *         {@link Long#MAX_VALUE}, the resulting
   *         content length is unknown.
   *      Otherwise, the resulting content length is the sum of the
   *         known content lengths, a number between
   *         `0` and {@link Long#MAX_VALUE}, inclusive.
   * 
   *
   * @implNote If the concatenation publisher's subscription is
   * {@linkplain Flow.Subscription#cancel() cancelled}, or an error occurs
   * while publishing the bytes, not all publishers in the sequence may
   * be subscribed to.
   *
   * @param publishers a sequence of publishers.
   * @return An aggregate publisher that publishes a request body
   * logically equivalent to the concatenation of all bytes published
   * by each publisher in the sequence.
   *
   * @since 16
  */
  static concat(...publishers: BodyPublisher[]): BodyPublisher;
}

}
declare module 'java.net.http.HttpResponse' {
import { Optional, List } from 'java.util';
import { Void } from 'java.lang';
import { InputStream } from 'java.io';
import { Stream } from 'java.util.stream';
import { Subscriber, Publisher } from 'java.util.concurrent.Flow';
import { CompletableFuture, ConcurrentMap, CompletionStage } from 'java.util.concurrent';
import { HttpRequest, HttpHeaders, HttpResponse } from 'java.net.http';
import { Version } from 'java.net.http.HttpClient';
import { ByteBuffer } from 'java.nio';
import { Function, Consumer } from 'java.util.function';
import { Path, OpenOption } from 'java.nio.file';
import { Charset } from 'java.nio.charset';
/**
 * Initial response information supplied to a {@link BodyHandler BodyHandler}
 * when a response is initially received and before the body is processed.
*/
export class ResponseInfo {
  /**
   * Provides the response status code.
   * @return the response status code
  */
  statusCode(): number;
  /**
   * Provides the response headers.
   * @return the response headers
  */
  headers(): HttpHeaders;
  /**
   * Provides the response protocol version.
   * @return the response protocol version
  */
  version(): Version;
}
/**
 * A handler for response bodies.  The class {@link BodyHandlers BodyHandlers}
 * provides implementations of many common body handlers.
 *
 *  The `BodyHandler` interface allows inspection of the response
 * code and headers, before the actual response body is received, and is
 * responsible for creating the response {@link BodySubscriber
 * BodySubscriber}. The `BodySubscriber` consumes the actual response
 * body bytes and, typically, converts them into a higher-level Java type.
 *
 *  A `BodyHandler` is a function that takes a {@link ResponseInfo
 * ResponseInfo} object; and which returns a `BodySubscriber`. The
 * `BodyHandler` is invoked when the response status code and headers
 * are available, but before the response  body bytes are received.
 *
 *  The following example uses one of the {@linkplain BodyHandlers
 * predefined body handlers} that always process the response body in the
 * same way ( streams the response body to a file ).
 *
 * {@snippet :
 *    HttpRequest request = HttpRequest.newBuilder()
 *        .uri(URI.create("http://www.foo.com/"))
 *        .build();
 *
 *  client.sendAsync(request, BodyHandlers.ofFile(Paths.get("/tmp/f")))
 *        .thenApply(HttpResponse::body)
 *        .thenAccept(System.out::println); }
 *
 * Note, that even though the pre-defined handlers do not examine the
 * response code, the response code and headers are always retrievable from
 * the {@link HttpResponse}, when it is returned.
 *
 *  In the second example, the function returns a different subscriber
 * depending on the status code.
 * {@snippet :
 *    HttpRequest request = HttpRequest.newBuilder()
 *        .uri(URI.create("http://www.foo.com/"))
 *        .build();
 *  BodyHandler bodyHandler = (rspInfo) -> rspInfo.statusCode() == 200
 *                      ? BodySubscribers.ofFile(Paths.get("/tmp/f"))
 *                      : BodySubscribers.replacing(Paths.get("/NULL"));
 *  client.sendAsync(request, bodyHandler)
 *        .thenApply(HttpResponse::body)
 *        .thenAccept(System.out::println); }
 *
 * @param  the response body type
 * @see BodyHandlers
 * @since 11
*/
export class BodyHandler<T> {
  /**
   * Returns a {@link BodySubscriber BodySubscriber} considering the
   * given response status code and headers. This method is invoked before
   * the actual response body bytes are read and its implementation must
   * return a {@link BodySubscriber BodySubscriber} to consume the response
   * body bytes.
   *
   *  The response body can be discarded using one of {@link
   * BodyHandlers#discarding() discarding} or {@link
   * BodyHandlers#replacing(Object) replacing}.
   *
   * @param responseInfo the response info
   * @return a body subscriber
  */
  apply(responseInfo: ResponseInfo): BodySubscriber<T>;
}
/**
 * Implementations of {@link BodyHandler BodyHandler} that implement various
 * useful handlers, such as handling the response body as a String, or
 * streaming the response body to a file.
 *
 *  These implementations do not examine the status code, meaning the
 * body is always accepted. They typically return an equivalently named
 * `BodySubscriber`. Alternatively, a custom handler can be used to
 * examine the status code and headers, and return a different body
 * subscriber, of the same type, as appropriate.
 *
 * The following are examples of using the predefined body handlers to
 * convert a flow of response body data into common high-level Java objects:
 *
 * {@snippet :
 *   // Receives the response body as a String
 *   HttpResponse response = client
 *     .send(request, BodyHandlers.ofString()); }
 *
 * {@snippet :
 *   // Receives the response body as a file
 *   HttpResponse response = client
 *     .send(request, BodyHandlers.ofFile(Paths.get("example.html"))); }
 *
 * {@snippet :
 *   // Receives the response body as an InputStream
 *   HttpResponse response = client
 *     .send(request, BodyHandlers.ofInputStream()); }
 *
 * {@snippet :
 *   // Discards the response body
 *   HttpResponse response = client
 *     .send(request, BodyHandlers.discarding());  }
 *
 * @since 11
*/
export class BodyHandlers {
  /**
   * Returns a response body handler that returns a {@link BodySubscriber
   * BodySubscriber}`` obtained from {@link
   * BodySubscribers#fromSubscriber(Subscriber)}, with the given
   * `subscriber`.
   *
   *  The response body is not available through this, or the `         * HttpResponse` API, but instead all response body is forwarded to the
   * given `subscriber`, which should make it available, if
   * appropriate, through some other mechanism, e.g. an entry in a
   * database, etc.
   *
   * @apiNote This method can be used as an adapter between `         * BodySubscriber` and `Flow.Subscriber`.
   *
   *  For example:
   * {@snippet :
   *  TextSubscriber subscriber = new TextSubscriber();
   *  HttpResponse response = client.sendAsync(request,
   *      BodyHandlers.fromSubscriber(subscriber)).join();
   *  System.out.println(response.statusCode()); }
   *
   * @param subscriber the subscriber
   * @return a response body handler
  */
  static fromSubscriber(subscriber: Subscriber<any>): BodyHandler<Void>;
  /**
   * Returns a response body handler that returns a {@link BodySubscriber
   * BodySubscriber}`` obtained from {@link
   * BodySubscribers#fromSubscriber(Subscriber, Function)}, with the
   * given `subscriber` and `finisher` function.
   *
   *  The given `finisher` function is applied after the given
   * subscriber's `onComplete` has been invoked. The `finisher`
   * function is invoked with the given subscriber, and returns a value
   * that is set as the response's body.
   *
   * @apiNote This method can be used as an adapter between `         * BodySubscriber` and `Flow.Subscriber`.
   *
   *  For example:
   * {@snippet :
   *  TextSubscriber subscriber = ...;  // accumulates bytes and transforms them into a String
   *  HttpResponse response = client.sendAsync(request,
   *      BodyHandlers.fromSubscriber(subscriber, TextSubscriber::getTextResult)).join();
   *  String text = response.body(); }
   *
   * @param  the type of the Subscriber
   * @param  the type of the response body
   * @param subscriber the subscriber
   * @param finisher a function to be applied after the subscriber has completed
   * @return a response body handler
  */
  static fromSubscriber<S>(subscriber: S, finisher: Function<any,T>): BodyHandler<T>;
  /**
   * Returns a response body handler that returns a {@link BodySubscriber
   * BodySubscriber}`` obtained from {@link
   * BodySubscribers#fromLineSubscriber(Subscriber, Function, Charset, String)
   * BodySubscribers.fromLineSubscriber(subscriber, s -> null, charset, null)},
   * with the given `subscriber`.
   * The {@link Charset charset} used to decode the response body bytes is
   * obtained from the HTTP response headers as specified by {@link #ofString()},
   * and lines are delimited in the manner of {@link BufferedReader#readLine()}.
   *
   *  The response body is not available through this, or the `         * HttpResponse` API, but instead all response body is forwarded to the
   * given `subscriber`, which should make it available, if
   * appropriate, through some other mechanism, e.g. an entry in a
   * database, etc.
   *
   * @apiNote This method can be used as an adapter between a `         * BodySubscriber` and a text based `Flow.Subscriber` that parses
   * text line by line.
   *
   *  For example:
   * {@snippet :
   *  // A PrintSubscriber that implements Flow.Subscriber
   *  // and print lines received by onNext() on System.out
   *  PrintSubscriber subscriber = new PrintSubscriber(System.out);
   *  client.sendAsync(request, BodyHandlers.fromLineSubscriber(subscriber))
   *      .thenApply(HttpResponse::statusCode)
   *      .thenAccept((status) -> {
   *          if (status != 200) {
   *              System.err.printf("ERROR: %d status received%n", status);
   *          }
   *      }); }
   *
   * @param subscriber the subscriber
   * @return a response body handler
  */
  static fromLineSubscriber(subscriber: Subscriber<any>): BodyHandler<Void>;
  /**
   * Returns a response body handler that returns a {@link BodySubscriber
   * BodySubscriber}`` obtained from {@link
   * BodySubscribers#fromLineSubscriber(Subscriber, Function, Charset, String)
   * BodySubscribers.fromLineSubscriber(subscriber, finisher, charset, lineSeparator)},
   * with the given `subscriber`, `finisher` function, and line separator.
   * The {@link Charset charset} used to decode the response body bytes is
   * obtained from the HTTP response headers as specified by {@link #ofString()}.
   *
   *  The given `finisher` function is applied after the given
   * subscriber's `onComplete` has been invoked. The `finisher`
   * function is invoked with the given subscriber, and returns a value
   * that is set as the response's body.
   *
   * @apiNote This method can be used as an adapter between a `         * BodySubscriber` and a text based `Flow.Subscriber` that parses
   * text line by line.
   *
   *  For example:
   * {@snippet :
   *  // A LineParserSubscriber that implements Flow.Subscriber
   *  // and accumulates lines that match a particular pattern
   *  Pattern pattern = ...;
   *  LineParserSubscriber subscriber = new LineParserSubscriber(pattern);
   *  HttpResponse> response = client.send(request,
   *      BodyHandlers.fromLineSubscriber(subscriber, s -> s.getMatchingLines(), "\n"));
   *  if (response.statusCode() != 200) {
   *      System.err.printf("ERROR: %d status received%n", response.statusCode());
   *  } }
   *
   *
   * @param  the type of the Subscriber
   * @param  the type of the response body
   * @param subscriber the subscriber
   * @param finisher a function to be applied after the subscriber has completed
   * @param lineSeparator an optional line separator: can be `null`,
   *                      in which case lines will be delimited in the manner of
   *                      {@link BufferedReader#readLine()}.
   * @return a response body handler
   * @throws IllegalArgumentException if the supplied `lineSeparator`
   *         is the empty string
  */
  static fromLineSubscriber<S>(subscriber: S, finisher: Function<any,T>, lineSeparator: string): BodyHandler<T>;
  /**
   * Returns a response body handler that discards the response body.
   *
   * @return a response body handler
  */
  static discarding(): BodyHandler<Void>;
  /**
   * Returns a response body handler that returns the given replacement
   * value, after discarding the response body.
   *
   * @param  the response body type
   * @param value the value of U to return as the body, may be `null`
   * @return a response body handler
  */
  static replacing<U>(value: U): BodyHandler<U>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}`` obtained from
   * {@link BodySubscribers#ofString(Charset) BodySubscribers.ofString(Charset)}.
   * The body is decoded using the given character set.
   *
   * @param charset the character set to convert the body with
   * @return a response body handler
  */
  static ofString(charset: Charset): BodyHandler<string>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}`` obtained from
   * {@link BodySubscribers#ofFile(Path, OpenOption...)
   * BodySubscribers.ofFile(Path,OpenOption...)}.
   *
   *  When the `HttpResponse` object is returned, the body has
   * been completely written to the file, and {@link #body()} returns a
   * reference to its {@link Path}.
   *
   *  In the case of the default file system provider, security manager
   * permission checks are performed in this factory method, when the
   * `BodyHandler` is created. Otherwise,
   * {@linkplain FileChannel#open(Path, OpenOption...) permission checks}
   * may be performed asynchronously against the caller's context
   * at file access time.
   * Care must be taken that the `BodyHandler` is not shared with
   * untrusted code.
   *
   * @param  file the file to store the body in
   * @param  openOptions any options to use when opening/creating the file
   * @return a response body handler
   * @throws IllegalArgumentException if an invalid set of open options
   *         are specified
   * @throws SecurityException in the case of the default file system
   *         provider, and a security manager is installed,
   *         {@link SecurityManager#checkWrite(String) checkWrite}
   *         is invoked to check write access to the given file
  */
  static ofFile(file: Path, ...openOptions: OpenOption[]): BodyHandler<Path>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}``.
   *
   *  Equivalent to: `ofFile(file, CREATE, WRITE)`
   *
   *  In the case of the default file system provider, security manager
   * permission checks are performed in this factory method, when the
   * `BodyHandler` is created. Otherwise,
   * {@linkplain FileChannel#open(Path, OpenOption...) permission checks}
   * may be performed asynchronously against the caller's context
   * at file access time.
   * Care must be taken that the `BodyHandler` is not shared with
   * untrusted code.
   *
   * @param  file the file to store the body in
   * @return a response body handler
   * @throws SecurityException in the case of the default file system
   *         provider, and a security manager is installed,
   *         {@link SecurityManager#checkWrite(String) checkWrite}
   *         is invoked to check write access to the given file
  */
  static ofFile(file: Path): BodyHandler<Path>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}<{@link Path}>
   * where the download directory is specified, but the filename is
   * obtained from the `Content-Disposition` response header. The
   * `Content-Disposition` header must specify the attachment
   * type and must also contain a filename parameter. If the
   * filename specifies multiple path components only the final component
   * is used as the filename (with the given directory name).
   *
   *  When the `HttpResponse` object is returned, the body has
   * been completely written to the file and {@link #body()} returns a
   * `Path` object for the file. The returned `Path` is the
   * combination of the supplied directory name and the file name supplied
   * by the server. If the destination directory does not exist or cannot
   * be written to, then the response will fail with an {@link IOException}.
   *
   *  Security manager permission checks are performed in this factory
   * method, when the `BodyHandler` is created. Care must be taken
   * that the `BodyHandler` is not shared with untrusted code.
   *
   * @param  directory the directory to store the file in
   * @param  openOptions open options used when opening the file
   * @return a response body handler
   * @throws IllegalArgumentException if the given path does not exist,
   *         is not of the default file system, is not a directory,
   *         is not writable, or if an invalid set of open options
   *         are specified
   * @throws SecurityException in the case of the default file system
   *         provider and a security manager has been installed,
   *         and it denies
   *         {@linkplain SecurityManager#checkRead(String) read access}
   *         to the directory, or it denies
   *         {@linkplain SecurityManager#checkWrite(String) write access}
   *         to the directory, or it denies
   *         {@linkplain SecurityManager#checkWrite(String) write access}
   *         to the files within the directory.
  */
  static ofFileDownload(directory: Path, ...openOptions: OpenOption[]): BodyHandler<Path>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}`` obtained from
   * {@link BodySubscribers#ofInputStream() BodySubscribers.ofInputStream}.
   *
   *  When the `HttpResponse` object is returned, the response
   * headers will have been completely read, but the body may not have
   * been fully received yet. The {@link #body()} method returns an
   * {@link InputStream} from which the body can be read as it is received.
   *
   * @apiNote See {@link BodySubscribers#ofInputStream()} for more
   * information.
   *
   * @return a response body handler
  */
  static ofInputStream(): BodyHandler<InputStream>;
  /**
   * Returns a `BodyHandler>` that returns a
   * {@link BodySubscriber BodySubscriber}`>` obtained
   * from {@link BodySubscribers#ofLines(Charset) BodySubscribers.ofLines(charset)}.
   * The {@link Charset charset} used to decode the response body bytes is
   * obtained from the HTTP response headers as specified by {@link #ofString()},
   * and lines are delimited in the manner of {@link BufferedReader#readLine()}.
   *
   *  When the `HttpResponse` object is returned, the body may
   * not have been completely received.
   *
   * @return a response body handler
  */
  static ofLines(): BodyHandler<Stream<string>>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}`` obtained from
   * {@link BodySubscribers#ofByteArrayConsumer(Consumer)
   * BodySubscribers.ofByteArrayConsumer(Consumer)}.
   *
   *  When the `HttpResponse` object is returned, the body has
   * been completely written to the consumer.
   *
   * @apiNote
   * The subscriber returned by this handler is not flow controlled.
   * Therefore, the supplied consumer must be able to process whatever
   * amount of data is delivered in a timely fashion.
   *
   * @param consumer a Consumer to accept the response body
   * @return a response body handler
  */
  static ofByteArrayConsumer(consumer: Consumer<Optional<number[]>>): BodyHandler<Void>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}`` obtained
   * from {@link BodySubscribers#ofByteArray() BodySubscribers.ofByteArray()}.
   *
   *  When the `HttpResponse` object is returned, the body has
   * been completely written to the byte array.
   *
   * @return a response body handler
  */
  static ofByteArray(): BodyHandler<number[]>;
  /**
   * Returns a `BodyHandler` that returns a
   * {@link BodySubscriber BodySubscriber}`` obtained from
   * {@link BodySubscribers#ofString(Charset) BodySubscribers.ofString(Charset)}.
   * The body is decoded using the character set specified in
   * the `Content-Type` response header. If there is no such
   * header, or the character set is not supported, then
   * {@link StandardCharsets#UTF_8 UTF_8} is used.
   *
   *  When the `HttpResponse` object is returned, the body has
   * been completely written to the string.
   *
   * @return a response body handler
  */
  static ofString(): BodyHandler<string>;
  /**
   * Returns a `BodyHandler>>` that creates a
   * {@link BodySubscriber BodySubscriber}`>>`
   * obtained from {@link BodySubscribers#ofPublisher()
   * BodySubscribers.ofPublisher()}.
   *
   *  When the `HttpResponse` object is returned, the response
   * headers will have been completely read, but the body may not have
   * been fully received yet. The {@link #body()} method returns a
   * {@link Publisher Publisher}`>` from which the body
   * response bytes can be obtained as they are received. The publisher
   * can and must be subscribed to only once.
   *
   * @apiNote See {@link BodySubscribers#ofPublisher()} for more
   * information.
   *
   * @return a response body handler
  */
  static ofPublisher(): BodyHandler<Publisher<ByteBuffer[]>>;
  /**
   * Returns a `BodyHandler` which, when invoked, returns a {@linkplain
   * BodySubscribers#buffering(BodySubscriber,int) buffering BodySubscriber}
   * that buffers data before delivering it to the downstream subscriber.
   * These `BodySubscriber` instances are created by calling
   * {@link BodySubscribers#buffering(BodySubscriber,int)
   * BodySubscribers.buffering} with a subscriber obtained from the given
   * downstream handler and the `bufferSize` parameter.
   *
   * @param  the response body type
   * @param downstreamHandler the downstream handler
   * @param bufferSize the buffer size parameter passed to {@link
   *        BodySubscribers#buffering(BodySubscriber,int) BodySubscribers.buffering}
   * @return a body handler
   * @throws IllegalArgumentException if `bufferSize <= 0`
  */
  static buffering<T>(downstreamHandler: BodyHandler<T>, bufferSize: number): BodyHandler<T>;
}
/**
 * A handler for push promises.
 *
 *  A push promise is a synthetic request sent by an HTTP/2 server
 * when retrieving an initiating client-sent request. The server has
 * determined, possibly through inspection of the initiating request, that
 * the client will likely need the promised resource, and hence pushes a
 * synthetic push request, in the form of a push promise, to the client. The
 * client can choose to accept or reject the push promise request.
 *
 *  A push promise request may be received up to the point where the
 * response body of the initiating client-sent request has been fully
 * received. The delivery of a push promise response, however, is not
 * coordinated with the delivery of the response to the initiating
 * client-sent request.
 *
 * @param  the push promise response body type
 * @since 11
*/
export class PushPromiseHandler<T> {
  /**
   * Notification of an incoming push promise.
   *
   *  This method is invoked once for each push promise received, up
   * to the point where the response body of the initiating client-sent
   * request has been fully received.
   *
   *  A push promise is accepted by invoking the given `acceptor`
   * function. The `acceptor` function must be passed a non-null
   * `BodyHandler`, that is to be used to handle the promise's
   * response body. The acceptor function will return a `         * CompletableFuture` that completes with the promise's response.
   *
   *  If the `acceptor` function is not successfully invoked,
   * then the push promise is rejected. The `acceptor` function will
   * throw an `IllegalStateException` if invoked more than once.
   *
   * @param initiatingRequest the initiating client-send request
   * @param pushPromiseRequest the synthetic push request
   * @param acceptor the acceptor function that must be successfully
   *                 invoked to accept the push promise
  */
  applyPushPromise(initiatingRequest: HttpRequest, pushPromiseRequest: HttpRequest, acceptor: Function<BodyHandler<T>,CompletableFuture<HttpResponse<T>>>): void;
  /**
   * Returns a push promise handler that accumulates push promises, and
   * their responses, into the given map.
   *
   *  Entries are added to the given map for each push promise accepted.
   * The entry's key is the push request, and the entry's value is a
   * `CompletableFuture` that completes with the response
   * corresponding to the key's push request. A push request is rejected /
   * cancelled if there is already an entry in the map whose key is
   * {@linkplain HttpRequest#equals equal} to it. A push request is
   * rejected / cancelled if it  does not have the same origin as its
   * initiating request.
   *
   *  Entries are added to the given map as soon as practically
   * possible when a push promise is received and accepted. That way code,
   * using such a map like a cache, can determine if a push promise has
   * been issued by the server and avoid making, possibly, unnecessary
   * requests.
   *
   *  The delivery of a push promise response is not coordinated with
   * the delivery of the response to the initiating client-sent request.
   * However, when the response body for the initiating client-sent
   * request has been fully received, the map is guaranteed to be fully
   * populated, that is, no more entries will be added. The individual
   * `CompletableFutures` contained in the map may or may not
   * already be completed at this point.
   *
   * @param  the push promise response body type
   * @param pushPromiseHandler t he body handler to use for push promises
   * @param pushPromisesMap a map to accumulate push promises into
   * @return a push promise handler
  */
  static of<T>(pushPromiseHandler: Function<HttpRequest,BodyHandler<T>>, pushPromisesMap: ConcurrentMap<HttpRequest,CompletableFuture<HttpResponse<T>>>): PushPromiseHandler<T>;
}
/**
 * A `BodySubscriber` consumes response body bytes and converts them
 * into a higher-level Java type.  The class {@link BodySubscribers
 * BodySubscribers} provides implementations of many common body subscribers.
 *
 *  The object acts as a {@link Flow.Subscriber}<{@link List}<{@link
 * ByteBuffer}>> to the HTTP Client implementation, which publishes
 * lists of ByteBuffers containing the response body. The Flow of data, as
 * well as the order of ByteBuffers in the Flow lists, is a strictly ordered
 * representation of the response body. Both the Lists and the ByteBuffers,
 * once passed to the subscriber, are no longer used by the HTTP Client. The
 * subscriber converts the incoming buffers of data to some higher-level
 * Java type `T`.
 *
 *  The {@link #getBody()} method returns a
 * {@link CompletionStage}`` that provides the response body
 * object. The `CompletionStage` must be obtainable at any time. When
 * it completes depends on the nature of type `T`. In many cases,
 * when `T` represents the entire body after being consumed then
 * the `CompletionStage` completes after the body has been consumed.
 * If  `T` is a streaming type, such as {@link java.io.InputStream
 * InputStream}, then it completes before the body has been read, because
 * the calling code uses the `InputStream` to consume the data.
 *
 * @apiNote To ensure that all resources associated with the corresponding
 * HTTP exchange are properly released, an implementation of `     * BodySubscriber` should ensure to {@linkplain Flow.Subscription#request
 * request} more data until one of {@link #onComplete() onComplete} or
 * {@link #onError(Throwable) onError} are signalled, or {@link
 * Flow.Subscription#request cancel} its {@linkplain
 * #onSubscribe(Flow.Subscription) subscription} if unable or unwilling to
 * do so. Calling `cancel` before exhausting the response body data
 * may cause the underlying HTTP connection to be closed and prevent it
 * from being reused for subsequent operations.
 *
 * @implNote The flow of data containing the response body is immutable.
 * Specifically, it is a flow of unmodifiable lists of read-only ByteBuffers.
 *
 * @param  the response body type
 * @see BodySubscribers
 * @since 11
*/
export class BodySubscriber<T> extends Subscriber<ByteBuffer[]> {
  /**
   * Returns a `CompletionStage` which when completed will return
   * the response body object. This method can be called at any time
   * relative to the other {@link Flow.Subscriber} methods and is invoked
   * using the client's {@link HttpClient#executor() executor}.
   *
   * @return a CompletionStage for the response body
  */
  get body(): CompletionStage<T>;
}
/**
 * Implementations of {@link BodySubscriber BodySubscriber} that implement
 * various useful subscribers, such as converting the response body bytes
 * into a String, or streaming the bytes to a file.
 *
 * The following are examples of using the predefined body subscribers
 * to convert a flow of response body data into common high-level Java
 * objects:
 *
 * {@snippet :
 *   // Streams the response body to a File
 *   HttpResponse response = client
 *     .send(request, responseInfo -> BodySubscribers.ofFile(Paths.get("example.html")); }
 *
 * {@snippet :
 *   // Accumulates the response body and returns it as a byte[]
 *   HttpResponse response = client
 *     .send(request, responseInfo -> BodySubscribers.ofByteArray()); }
 *
 * {@snippet :
 *   // Discards the response body
 *   HttpResponse response = client
 *     .send(request, responseInfo -> BodySubscribers.discarding()); }
 *
 * {@snippet :
 *   // Accumulates the response body as a String then maps it to its bytes
 *   HttpResponse response = client
 *     .send(request, responseInfo ->
 *        BodySubscribers.mapping(BodySubscribers.ofString(UTF_8), String::getBytes)); }
 *
 * @since 11
*/
export class BodySubscribers {
  /**
   * Returns a body subscriber that forwards all response body to the
   * given `Flow.Subscriber`. The {@linkplain BodySubscriber#getBody()
   * completion stage} of the returned body subscriber completes after one
   * of the given subscribers `onComplete` or `onError` has
   * been invoked.
   *
   * @apiNote This method can be used as an adapter between `         * BodySubscriber` and `Flow.Subscriber`.
   *
   * @param subscriber the subscriber
   * @return a body subscriber
  */
  static fromSubscriber(subscriber: Subscriber<any>): BodySubscriber<Void>;
  /**
   * Returns a body subscriber that forwards all response body to the
   * given `Flow.Subscriber`. The {@linkplain BodySubscriber#getBody()
   * completion stage} of the returned body subscriber completes after one
   * of the given subscribers `onComplete` or `onError` has
   * been invoked.
   *
   *  The given `finisher` function is applied after the given
   * subscriber's `onComplete` has been invoked. The `finisher`
   * function is invoked with the given subscriber, and returns a value
   * that is set as the response's body.
   *
   * @apiNote This method can be used as an adapter between `         * BodySubscriber` and `Flow.Subscriber`.
   *
   * @param  the type of the Subscriber
   * @param  the type of the response body
   * @param subscriber the subscriber
   * @param finisher a function to be applied after the subscriber has
   *                 completed
   * @return a body subscriber
  */
  static fromSubscriber<S>(subscriber: S, finisher: Function<any,T>): BodySubscriber<T>;
  /**
   * Returns a body subscriber that forwards all response body to the
   * given `Flow.Subscriber`, line by line.
   * The {@linkplain BodySubscriber#getBody() completion
   * stage} of the returned body subscriber completes after one of the
   * given subscribers `onComplete` or `onError` has been
   * invoked.
   * Bytes are decoded using the {@link StandardCharsets#UTF_8
   * UTF-8} charset, and lines are delimited in the manner of
   * {@link BufferedReader#readLine()}.
   *
   * @apiNote This method can be used as an adapter between `         * BodySubscriber` and `Flow.Subscriber`.
   *
   * @implNote This is equivalent to calling {@snippet :
   *      fromLineSubscriber(subscriber, s -> null, StandardCharsets.UTF_8, null) }
   *
   * @param subscriber the subscriber
   * @return a body subscriber
  */
  static fromLineSubscriber(subscriber: Subscriber<any>): BodySubscriber<Void>;
  /**
   * Returns a body subscriber that forwards all response body to the
   * given `Flow.Subscriber`, line by line. The {@linkplain
   * BodySubscriber#getBody() completion stage} of the returned body
   * subscriber completes after one of the given subscribers
   * `onComplete` or `onError` has been invoked.
   *
   *  The given `finisher` function is applied after the given
   * subscriber's `onComplete` has been invoked. The `finisher`
   * function is invoked with the given subscriber, and returns a value
   * that is set as the response's body.
   *
   * @apiNote This method can be used as an adapter between `         * BodySubscriber` and `Flow.Subscriber`.
   *
   * @param  the type of the Subscriber
   * @param  the type of the response body
   * @param subscriber the subscriber
   * @param finisher a function to be applied after the subscriber has
   *                 completed
   * @param charset a {@link Charset} to decode the bytes
   * @param lineSeparator an optional line separator: can be `null`,
   *                      in which case lines will be delimited in the manner of
   *                      {@link BufferedReader#readLine()}.
   * @return a body subscriber
   * @throws IllegalArgumentException if the supplied `lineSeparator`
   *         is the empty string
  */
  static fromLineSubscriber<S>(subscriber: S, finisher: Function<any,T>, charset: Charset, lineSeparator: string): BodySubscriber<T>;
  /**
   * Returns a body subscriber which stores the response body as a `         * String` converted using the given `Charset`.
   *
   *  The {@link HttpResponse} using this subscriber is available after
   * the entire response has been read.
   *
   * @param charset the character set to convert the String with
   * @return a body subscriber
  */
  static ofString(charset: Charset): BodySubscriber<string>;
  /**
   * Returns a `BodySubscriber` which stores the response body as a
   * byte array.
   *
   *  The {@link HttpResponse} using this subscriber is available after
   * the entire response has been read.
   *
   * @return a body subscriber
  */
  static ofByteArray(): BodySubscriber<number[]>;
  /**
   * Returns a `BodySubscriber` which stores the response body in a
   * file opened with the given options and name. The file will be opened
   * with the given options using {@link FileChannel#open(Path,OpenOption...)
   * FileChannel.open} just before the body is read. Any exception thrown
   * will be returned or thrown from {@link HttpClient#send(HttpRequest,
   * BodyHandler) HttpClient::send} or {@link HttpClient#sendAsync(HttpRequest,
   * BodyHandler) HttpClient::sendAsync} as appropriate.
   *
   *  The {@link HttpResponse} using this subscriber is available after
   * the entire response has been read.
   *
   *  In the case of the default file system provider, security manager
   * permission checks are performed in this factory method, when the
   * `BodySubscriber` is created. Otherwise,
   * {@linkplain FileChannel#open(Path, OpenOption...) permission checks}
   * may be performed asynchronously against the caller's context
   * at file access time.
   * Care must be taken that the `BodySubscriber` is not shared with
   * untrusted code.
   *
   * @param  file the file to store the body in
   * @param  openOptions the list of options to open the file with
   * @return a body subscriber
   * @throws IllegalArgumentException if an invalid set of open options
   *         are specified
   * @throws SecurityException in the case of the default file system
   *         provider, and a security manager is installed,
   *         {@link SecurityManager#checkWrite(String) checkWrite}
   *         is invoked to check write access to the given file
  */
  static ofFile(file: Path, ...openOptions: OpenOption[]): BodySubscriber<Path>;
  /**
   * Returns a `BodySubscriber` which stores the response body in a
   * file opened with the given name.
   *
   *  Equivalent to: `ofFile(file, CREATE, WRITE)`
   *
   *  In the case of the default file system provider, security manager
   * permission checks are performed in this factory method, when the
   * `BodySubscriber` is created. Otherwise,
   * {@linkplain FileChannel#open(Path, OpenOption...) permission checks}
   * may be performed asynchronously against the caller's context
   * at file access time.
   * Care must be taken that the `BodySubscriber` is not shared with
   * untrusted code.
   *
   * @param  file the file to store the body in
   * @return a body subscriber
   * @throws SecurityException in the case of the default file system
   *         provider, and a security manager is installed,
   *         {@link SecurityManager#checkWrite(String) checkWrite}
   *         is invoked to check write access to the given file
  */
  static ofFile(file: Path): BodySubscriber<Path>;
  /**
   * Returns a `BodySubscriber` which provides the incoming body
   * data to the provided Consumer of `Optional`. Each
   * call to {@link Consumer#accept(java.lang.Object) Consumer.accept()}
   * will contain a non empty `Optional`, except for the final
   * invocation after all body data has been read, when the `         * Optional` will be empty.
   *
   *  The {@link HttpResponse} using this subscriber is available after
   * the entire response has been read.
   *
   * @apiNote
   * This subscriber is not flow controlled.
   * Therefore, the supplied consumer must be able to process whatever
   * amount of data is delivered in a timely fashion.
   *
   * @param consumer a Consumer of byte arrays
   * @return a BodySubscriber
  */
  static ofByteArrayConsumer(consumer: Consumer<Optional<number[]>>): BodySubscriber<Void>;
  /**
   * Returns a `BodySubscriber` which streams the response body as
   * an {@link InputStream}.
   *
   *  The {@link HttpResponse} using this subscriber is available
   * immediately after the response headers have been read, without
   * requiring to wait for the entire body to be processed. The response
   * body can then be read directly from the {@link InputStream}.
   *
   * @apiNote To ensure that all resources associated with the
   * corresponding exchange are properly released the caller must
   * ensure to either read all bytes until EOF is reached, or call
   * {@link InputStream#close} if it is unable or unwilling to do so.
   * Calling `close` before exhausting the stream may cause
   * the underlying HTTP connection to be closed and prevent it
   * from being reused for subsequent operations.
   *
   * @implNote The `read` method of the `InputStream`
   * returned by the default implementation of this method will
   * throw an `IOException` with the {@linkplain Thread#isInterrupted()
   * thread interrupt status set} if the thread is interrupted
   * while blocking on read. In that case, the request will also be
   * cancelled and the `InputStream` will be closed.
   *
   * @return a body subscriber that streams the response body as an
   *         {@link InputStream}.
  */
  static ofInputStream(): BodySubscriber<InputStream>;
  /**
   * Returns a `BodySubscriber` which streams the response body as
   * a {@link Stream Stream}``, where each string in the stream
   * corresponds to a line as defined by {@link BufferedReader#lines()}.
   *
   *  The {@link HttpResponse} using this subscriber is available
   * immediately after the response headers have been read, without
   * requiring to wait for the entire body to be processed. The response
   * body can then be read directly from the {@link Stream}.
   *
   * @apiNote To ensure that all resources associated with the
   * corresponding exchange are properly released the caller must
   * ensure to either read all lines until the stream is exhausted,
   * or call {@link Stream#close} if it is unable or unwilling to do so.
   * Calling `close` before exhausting the stream may cause
   * the underlying HTTP connection to be closed and prevent it
   * from being reused for subsequent operations.
   *
   * @param charset the character set to use when converting bytes to characters
   * @return a body subscriber that streams the response body as a
   *         {@link Stream Stream}``.
   *
   * @see BufferedReader#lines()
  */
  static ofLines(charset: Charset): BodySubscriber<Stream<string>>;
  /**
   * Returns a response subscriber which publishes the response body
   * through a `Publisher>`.
   *
   *  The {@link HttpResponse} using this subscriber is available
   * immediately after the response headers have been read, without
   * requiring to wait for the entire body to be processed. The response
   * body bytes can then be obtained by subscribing to the publisher
   * returned by the `HttpResponse` {@link HttpResponse#body() body}
   * method.
   *
   * The publisher returned by the {@link HttpResponse#body() body}
   * method can be subscribed to only once. The first subscriber will
   * receive the body response bytes if successfully subscribed, or will
   * cause the subscription to be cancelled otherwise.
   * If more subscriptions are attempted, the subsequent subscribers will
   * be immediately subscribed with an empty subscription and their
   * {@link Subscriber#onError(Throwable) onError} method
   * will be invoked with an `IllegalStateException`.
   *
   * @apiNote To ensure that all resources associated with the
   * corresponding exchange are properly released the caller must
   * ensure that the provided publisher is subscribed once, and either
   * {@linkplain Subscription#request(long) requests} all bytes
   * until {@link Subscriber#onComplete() onComplete} or
   * {@link Subscriber#onError(Throwable) onError} are invoked, or
   * cancel the provided {@linkplain Subscriber#onSubscribe(Subscription)
   * subscription} if it is unable or unwilling to do so.
   * Note that depending on the actual HTTP protocol {@linkplain
   * HttpClient.Version version} used for the exchange, cancelling the
   * subscription instead of exhausting the flow may cause the underlying
   * HTTP connection to be closed and prevent it from being reused for
   * subsequent operations.
   *
   * @return A `BodySubscriber` which publishes the response body
   *         through a `Publisher>`.
  */
  static ofPublisher(): BodySubscriber<Publisher<ByteBuffer[]>>;
  /**
   * Returns a response subscriber which discards the response body. The
   * supplied value is the value that will be returned from
   * {@link HttpResponse#body()}.
   *
   * @param  the type of the response body
   * @param value the value to return from HttpResponse.body(), may be `null`
   * @return a `BodySubscriber`
  */
  static replacing<U>(value: U): BodySubscriber<U>;
  /**
   * Returns a response subscriber which discards the response body.
   *
   * @return a response body subscriber
  */
  static discarding(): BodySubscriber<Void>;
  /**
   * Returns a `BodySubscriber` which buffers data before delivering
   * it to the given downstream subscriber. The subscriber guarantees to
   * deliver `bufferSize` bytes of data to each invocation of the
   * downstream's {@link BodySubscriber#onNext(Object) onNext} method,
   * except for the final invocation, just before
   * {@link BodySubscriber#onComplete() onComplete} is invoked. The final
   * invocation of `onNext` may contain fewer than `bufferSize`
   * bytes.
   *
   *  The returned subscriber delegates its {@link BodySubscriber#getBody()
   * getBody()} method to the downstream subscriber.
   *
   * @param  the type of the response body
   * @param downstream the downstream subscriber
   * @param bufferSize the buffer size
   * @return a buffering body subscriber
   * @throws IllegalArgumentException if `bufferSize <= 0`
  */
  static buffering<T>(downstream: BodySubscriber<T>, bufferSize: number): BodySubscriber<T>;
  /**
   * Returns a `BodySubscriber` whose response body value is that of
   * the result of applying the given function to the body object of the
   * given `upstream` `BodySubscriber`.
   *
   *  The mapping function is executed using the client's {@linkplain
   * HttpClient#executor() executor}, and can therefore be used to map any
   * response body type, including blocking {@link InputStream}.
   * However, performing any blocking operation in the mapper function
   * runs the risk of blocking the executor's thread for an unknown
   * amount of time (at least until the blocking operation finishes),
   * which may end up starving the executor of available threads.
   * Therefore, in the case where mapping to the desired type might
   * block (e.g. by reading on the `InputStream`), then mapping
   * to a {@link java.util.function.Supplier Supplier} of the desired
   * type and deferring the blocking operation until {@link Supplier#get()
   * Supplier::get} is invoked by the caller's thread should be preferred,
   * as shown in the following example which uses a well-known JSON parser to
   * convert an `InputStream` into any annotated Java type.
   *
   * For example:
   * {@snippet :
   *   public static  BodySubscriber> asJSON(Class targetType) {
   *     BodySubscriber upstream = BodySubscribers.ofInputStream();
   *
   *     BodySubscriber> downstream = BodySubscribers.mapping(
   *           upstream,
   *           (InputStream is) -> () -> {
   *               try (InputStream stream = is) {
   *                   ObjectMapper objectMapper = new ObjectMapper();
   *                   return objectMapper.readValue(stream, targetType);
   *               } catch (IOException e) {
   *                   throw new UncheckedIOException(e);
   *               }
   *           });
   *    return downstream;
   *  } }
   *
   * @param  the upstream body type
   * @param  the type of the body subscriber returned
   * @param upstream the body subscriber to be mapped
   * @param mapper the mapping function
   * @return a mapping body subscriber
  */
  static mapping<T>(upstream: BodySubscriber<T>, mapper: Function<any,U>): BodySubscriber<U>;
}

}
