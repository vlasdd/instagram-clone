"use strict";(self.webpackChunkinstagram_clone=self.webpackChunkinstagram_clone||[]).push([[52],{4219:function(e,t,s){var n=s(2791),r=s(184),a=n.memo((function(e){var t=e.areYouSureEvent,s=e.profileImage,n=e.closeEvent,a=e.buttonText,l=e.questionText,c=e.additionalText;return(0,r.jsxs)("div",{className:"h-full w-full flex flex-col items-center z-50",children:[(0,r.jsx)("div",{className:"w-full h-[100px] flex items-start justify-center ".concat(c?"mt-3 mb-2":"mt-6 mb-4"),children:(0,r.jsx)("img",{src:s.length?s:"/instagram-clone/images/default-avatar-image.jpg",className:"rounded-full h-[100px] w-[100px] object-cover"})}),(0,r.jsxs)("p",{className:"text-sm ".concat(!c&&"mb-6"),children:[l,"?"]}),c?(0,r.jsx)("p",{className:"text-gray-400 text-sm w-3/4 text-center mb-3 mt-1",children:c}):null,(0,r.jsx)("button",{className:"w-full h-12 border-t-2 flex items-center justify-center text-rose-600 font-bold text-sm",onClick:t,children:a}),(0,r.jsx)("button",{className:"w-full h-12 border-t-2 flex items-center justify-center text-sm",onClick:n,children:"Cancel"})]})}));t.Z=a},5910:function(e,t,s){var n=s(7762),r=s(5861),a=s(7757),l=s.n(a),c=s(83),i=s(9329),o=s(6724),u=s(4453),m=s(6871),f=s(1743);t.Z=function(){var e=(0,f.C)((function(e){return e.signedUser.user})),t=(0,m.s0)(),s=function(){var s=(0,r.Z)(l().mark((function s(n){var r,a,u,m,f,x;return l().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return r=n.chosenUserId,a=n.closeEvent,u=e.userId+"-"+r,m=r+"-"+e.userId,s.next=5,(0,o.PL)((0,o.hJ)(i.db,"chats"));case 5:if(f=s.sent,x="",f.forEach((function(e){var t=e.data().firstUserId+"-"+e.data().secondUserId;t!==u?t!==m||(x=m):x=u})),0===x.length){s.next=12;break}return a&&a(x),t(c.Z.DIRECT+"/"+x),s.abrupt("return");case 12:return s.next=14,(0,o.pl)((0,o.JU)(i.db,"chats",u),{firstUserId:e.userId,secondUserId:r,messages:[],lastMessage:{text:"",userId:""},lastEdited:(new Date).getTime()});case 14:a&&a(u),t(c.Z.DIRECT+"/"+u);case 16:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}(),a=function(){var e=(0,r.Z)(l().mark((function e(t){var s,r,a,c,m,f;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=t.messages,r=t.chatId,(0,o.oe)((0,o.JU)(i.db,"chats",r)),a=(0,n.Z)(s),e.prev=3,a.s();case 5:if((c=a.n()).done){e.next=13;break}if(!(m=c.value).media.length){e.next=11;break}return f=(0,u.iH)(i.tO,m.media),e.next=11,(0,u.oq)(f);case 11:e.next=5;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:case"end":return e.stop()}}),e,null,[[3,15,18,21]])})));return function(t){return e.apply(this,arguments)}}();return{createChatRoom:s,deleteChatRoom:a}}},3052:function(e,t,s){s.r(t),s.d(t,{default:function(){return T}});var n=s(2791),r=s(6871),a=s(1743),l=s(6033),c=s(885),i=s(9110),o=s(83),u=s(410),m=s(5315),f=s(1273),x=s(5861),d=s(7757),h=s.n(d),p=s(4851),g=s(5791),j=s(184),w=n.memo((function(e){var t=e.closeEvent,s=(0,a.C)((function(e){return e.signedUser.user})),r=(0,a.T)(),l=(0,n.useCallback)(function(){var e=(0,x.Z)(h().mark((function e(s){return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.target.files){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,r((0,g.Z)({image:s.target.files[0]}));case 4:t();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),c=(0,n.useCallback)((0,x.Z)(h().mark((function e(){return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r((0,p.Z)());case 2:t();case 3:case"end":return e.stop()}}),e)}))),[]);return(0,j.jsxs)("div",{className:"h-full w-full flex flex-col items-center",children:[(0,j.jsx)("div",{className:"w-full h-[50px] flex mt-2 mb-1 items-start justify-center",children:(0,j.jsx)("img",{src:s.profileImage.length?s.profileImage:"/instagram-clone/images/default-avatar-image.jpg",className:"rounded-full h-full w-[50px] object-cover"})}),(0,j.jsx)("p",{className:"font-medium text-md",children:"Synced Profile Photo"}),(0,j.jsx)("p",{className:"text-center text-gray-400 text-sm pb-2",children:"Instagram"}),(0,j.jsxs)("label",{className:"w-full h-12 border-t-2 flex items-center justify-center cursor-pointer",children:[(0,j.jsx)("input",{type:"file",accept:"image/png, image/jpg, image/jpeg",className:"hidden",onChange:l}),(0,j.jsx)("p",{className:"text-teal-500 font-medium text-sm",children:"Upload Photo"})]}),(0,j.jsx)("button",{className:"w-full h-12 border-t-2 flex items-center justify-center text-sm",children:"Manage Sync Settings"}),s.profileImage.length?(0,j.jsx)("button",{className:"w-full h-12 border-t-2 flex items-center justify-center text-rose-600 font-medium text-sm",onClick:c,children:"Remove Current Photo"}):void 0,(0,j.jsx)("button",{className:"w-full h-12 border-t-2 flex items-center justify-center text-sm",onClick:t,children:"Cancel"})]})})),v=w,b=function(){return(0,j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,j.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"})})},N=s(8029),k=n.memo((function(e){var t=e.isUsersPage,s=(0,r.s0)(),a=(0,r.TH)(),l=(0,n.useCallback)((function(){var e=a.pathname.split("/");return e[e.length-1]===i.Z.SAVED?1:0}),[a.pathname]),o=(0,n.useState)(l()),u=(0,c.Z)(o,2),m=u[0],f=u[1];(0,n.useEffect)((function(){f(l())}),[a.pathname]);return(0,j.jsxs)("nav",{className:"flex border-t justify-center items-center border-t-gray-300 gap-12 lg:gap-16 text-[12px] font-medium tracking-widest w-full sm:w-3/4 lg:w-2/3 max-w-[1000px]",children:[(0,j.jsxs)("button",{onClick:function(){s(i.Z.POSTS),f(0)},className:"\n                    h-12 flex items-center text-gray-400 gap-1 \n                    ".concat(0===m&&"border-t border-t-gray-900 text-black","\n                "),children:[(0,j.jsx)(b,{}),(0,j.jsx)("p",{children:"POSTS"})]}),t?(0,j.jsxs)("button",{onClick:function(){s(i.Z.SAVED),f(1)},className:"\n                            h-12 flex items-center text-gray-400 gap-1  \n                            ".concat(1===m&&"border-t border-t-gray-900 text-black","\n                        "),children:[(0,j.jsx)(N.Z,{styles:"w-4 h-4",includeHovering:!1}),(0,j.jsx)("p",{children:"SAVED"})]}):null]})})),C=n.memo((function(){var e=(0,a.C)((function(e){return e.signedUser})),t=e.user,s=e.status,l=(0,a.T)(),x=(0,r.UO)().uid,d=(0,r.s0)(),h=(0,n.useState)(!1),p=(0,c.Z)(h,2),g=p[0],w=p[1],b=(0,n.useState)(!1),N=(0,c.Z)(b,2),C=N[0],I=N[1];(0,n.useEffect)((function(){l((0,m.Z)(x))}),[x]),(0,n.useEffect)((function(){"rejected"===s&&(l((0,u.b9)()),w(!0))}),[s]);var Z=(0,n.useCallback)((function(e){e.stopPropagation(),d(i.Z.FOLLOWERS)}),[]),y=(0,n.useCallback)((function(e){e.stopPropagation(),d(i.Z.FOLLOWING)}),[]),U=(0,n.useCallback)((function(){I(!0)}),[]),E=(0,n.useCallback)((function(){I(!1)}),[]);return g?(0,j.jsx)(r.Fg,{to:o.Z.NOT_FOUND}):(0,j.jsxs)("div",{className:"min-h-[calc(100vh-60px)] w-screen flex flex-col items-center back",children:[(0,j.jsxs)("div",{className:"flex items-center flex-col sm:flex-row w-full sm:w-3/4 lg:w-5/6 xl:w-4/5 justify-center gap-2 pt-4 pb-3 px-1 max-w-[1000px]",children:[(0,j.jsx)("div",{className:"w-full sm:w-2/5 sm:h-60 flex justify-center items-center",children:(0,j.jsx)("img",{src:t.profileImage.length?t.profileImage:"/instagram-clone/images/default-avatar-gray.jpg",className:"rounded-full w-[170px] h-[170px] object-cover cursor-pointer",onClick:U})}),(0,j.jsxs)("div",{className:"flex flex-col w-5/6 sm:w-3/5 pt-4 gap-3 sm:gap-6",children:[(0,j.jsx)("div",{className:"flex gap-4 justify-center sm:justify-start",children:(0,j.jsx)("p",{className:"text-3xl font-extralight",children:t.username})}),(0,j.jsxs)("div",{className:"flex gap-8 justify-center sm:justify-start",children:[(0,j.jsxs)("div",{className:"flex gap-1 items-center",children:[(0,j.jsx)("p",{className:"font-medium",children:t.posts.length}),(0,j.jsx)("p",{children:"post".concat(1===t.posts.length?"":"s")})]}),(0,j.jsxs)("button",{onClick:Z,className:"flex gap-1 items-center",children:[(0,j.jsx)("p",{className:"font-medium",children:t.followers.length}),(0,j.jsx)("p",{children:"follower".concat(1===t.followers.length?"":"s")})]}),(0,j.jsxs)("button",{onClick:y,className:"flex gap-1 items-center",children:[(0,j.jsx)("p",{className:"font-medium",children:t.following.length}),(0,j.jsx)("p",{children:"following"})]})]}),(0,j.jsx)("div",{className:"flex px-8 sm:px-0",children:(0,j.jsx)("p",{className:"font-medium",children:t.fullName})})]})]}),C?(0,j.jsx)(f.Z,{closeEvent:E,styles:"top-[35%] ".concat(t.profileImage.length?"h-72":"h-60"),children:(0,j.jsx)(v,{closeEvent:E})}):null,(0,j.jsx)(k,{isUsersPage:!0}),(0,j.jsx)(r.j3,{})]})})),I=s(6053),Z=s(3713),y=s(4219),U=s(5910),E=s(349),O=s(4285),S=n.memo((function(){var e=(0,a.C)((function(e){return e.userOnPage})),t=e.user,s=e.status,l=(0,a.C)((function(e){return e.signedUser.user})),u=(0,a.T)(),m=(0,r.UO)().uid,x=(0,r.s0)(),d=(0,n.useState)(!1),h=(0,c.Z)(d,2),p=h[0],g=h[1],w=(0,n.useState)(!1),v=(0,c.Z)(w,2),b=v[0],N=v[1],C=(0,U.Z)().createChatRoom;(0,n.useEffect)((function(){u((0,Z.Z)(m))}),[m]),(0,n.useEffect)((function(){"rejected"===s&&(u((0,I.b9)()),g(!0))}),[s]);var S=(0,n.useCallback)((function(e){e.stopPropagation(),C({chosenUserId:t.userId})}),[t.userId]),P=(0,n.useCallback)((function(e){e.stopPropagation(),N(!0)}),[]),T=(0,n.useCallback)((function(e){e.stopPropagation(),u((0,E.Z)({userId:t.userId,uid:m}))}),[t.userId,m]),F=(0,n.useCallback)((function(e){e.stopPropagation(),x(i.Z.FOLLOWERS)}),[]),L=(0,n.useCallback)((function(e){e.stopPropagation(),x(i.Z.FOLLOWING)}),[]),D=(0,n.useCallback)((function(){N(!1),u((0,O.Z)({userId:t.userId,uid:m}))}),[t.userId,m]),R=(0,n.useCallback)((function(){N(!1)}),[]);return p?(0,j.jsx)(r.Fg,{to:o.Z.NOT_FOUND}):(0,j.jsxs)("div",{className:"min-h-[calc(100vh-60px)] w-screen flex flex-col items-center back",children:[(0,j.jsxs)("div",{className:"flex items-center flex-col sm:flex-row w-full sm:w-3/4 lg:w-5/6 xl:w-4/5 justify-center gap-2 pt-4 pb-3 px-1 max-w-[1000px]",children:[(0,j.jsx)("div",{className:"w-full sm:w-2/5 sm:h-60 flex justify-center items-center",children:(0,j.jsx)("img",{src:t.profileImage.length?t.profileImage:"/instagram-clone/images/default-avatar-gray.jpg",className:"rounded-full w-[170px] h-[170px] object-cover"})}),(0,j.jsxs)("div",{className:"flex flex-col w-5/6 sm:w-3/5 pt-4 gap-3 sm:gap-6",children:[(0,j.jsxs)("div",{className:"flex gap-4",children:[(0,j.jsx)("p",{className:"text-3xl font-extralight",children:t.username}),(0,j.jsxs)("div",{className:"flex items-center gap-2",children:[(0,j.jsx)("button",{className:"h-7 w-20 rounded border text-sm font-medium cursor-pointer",onClick:S,children:"Message"}),l.username.length?l.following.some((function(e){return e.userId===t.userId}))?(0,j.jsx)("button",{className:"h-7 w-28 rounded border text-sm font-medium cursor-pointer",onClick:P,children:"Following"}):(0,j.jsx)("button",{className:"h-7 w-20 bg-blue-500 font-medium text-white rounded cursor-pointer text-sm tracking-wide",onClick:T,children:"Follow"}):null]})]}),(0,j.jsxs)("div",{className:"flex gap-2 sm:gap-8",children:[(0,j.jsxs)("div",{className:"flex gap-1 items-center flex-col sm:flex-row",children:[(0,j.jsx)("p",{className:"font-medium",children:t.posts.length}),(0,j.jsx)("p",{children:"post".concat(1===t.posts.length?"":"s")})]}),(0,j.jsxs)("button",{onClick:function(e){return F(e)},className:"flex gap-1 items-center flex-col sm:flex-row",children:[(0,j.jsx)("p",{className:"font-medium",children:t.followers.length}),(0,j.jsx)("p",{children:"follower".concat(1===t.followers.length?"":"s")})]}),(0,j.jsxs)("button",{onClick:function(e){return L(e)},className:"flex gap-1 items-center flex-col sm:flex-row",children:[(0,j.jsx)("p",{className:"font-medium",children:t.following.length}),(0,j.jsx)("p",{children:"following"})]})]}),(0,j.jsx)("p",{className:"font-medium",children:t.fullName}),(0,j.jsx)("div",{className:"flex"})]})]}),b?(0,j.jsx)(f.Z,{closeEvent:R,styles:"h-72 top-[26.5%]",children:(0,j.jsx)(y.Z,{areYouSureEvent:D,profileImage:t.profileImage,closeEvent:R,questionText:"Unfollow @".concat(t.username),buttonText:"Unfollow"})}):null,(0,j.jsx)(k,{isUsersPage:!1}),(0,j.jsx)(r.j3,{})]})})),P=s(8213),T=n.memo((function(){var e=(0,r.UO)().uid,t=(0,a.C)((function(e){return e.signedUser.user}));return t.userId.length?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(l.Z,{}),t.userId===e?(0,j.jsx)(C,{}):(0,j.jsx)(S,{})]}):(0,j.jsx)(P.Z,{})}))}}]);
//# sourceMappingURL=52.1577fffb.chunk.js.map