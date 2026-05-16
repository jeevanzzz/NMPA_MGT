import { motion } from 'motion/react';

export function Car3D() {
  return (
    <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
      <motion.div
        initial={{ rotateY: 0, x: -200, opacity: 0 }}
        animate={{ 
          rotateY: [0, 360, 720, 1080],
          x: [-200, 0, 200, 0],
          opacity: [0, 1, 1, 1]
        }}
        transition={{
          duration: 10,
          times: [0, 0.33, 0.66, 1],
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Car Body */}
        <div style={{ transformStyle: 'preserve-3d' }}>
          {/* Main Body */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative"
          >
            {/* Bottom Base */}
            <div 
              className="absolute bg-gradient-to-r from-red-600 to-red-700 rounded-lg"
              style={{
                width: '300px',
                height: '100px',
                transform: 'translateZ(0px)',
              }}
            />
            
            {/* Top Cabin */}
            <div 
              className="absolute bg-gradient-to-r from-red-500 to-red-600 rounded-t-3xl"
              style={{
                width: '180px',
                height: '80px',
                left: '60px',
                top: '-60px',
                transform: 'translateZ(0px)',
              }}
            />

            {/* Front */}
            <div 
              className="absolute bg-gradient-to-b from-red-700 to-red-800"
              style={{
                width: '300px',
                height: '100px',
                transform: 'rotateY(90deg) translateZ(50px)',
                transformOrigin: 'left center',
              }}
            />

            {/* Back */}
            <div 
              className="absolute bg-gradient-to-b from-red-700 to-red-800"
              style={{
                width: '300px',
                height: '100px',
                transform: 'rotateY(-90deg) translateZ(-250px)',
                transformOrigin: 'right center',
              }}
            />

            {/* Top Surface */}
            <div 
              className="absolute bg-gradient-to-r from-red-500 to-red-600"
              style={{
                width: '300px',
                height: '100px',
                transform: 'rotateX(90deg) translateZ(100px)',
                transformOrigin: 'top center',
              }}
            />

            {/* Bottom Surface */}
            <div 
              className="absolute bg-red-900"
              style={{
                width: '300px',
                height: '100px',
                transform: 'rotateX(-90deg) translateZ(0px)',
                transformOrigin: 'bottom center',
              }}
            />

            {/* Windows Front */}
            <div 
              className="absolute bg-gradient-to-b from-blue-300 to-blue-400 rounded-t-2xl"
              style={{
                width: '70px',
                height: '50px',
                left: '80px',
                top: '-55px',
                transform: 'translateZ(1px)',
              }}
            />

            {/* Windows Back */}
            <div 
              className="absolute bg-gradient-to-b from-blue-300 to-blue-400 rounded-t-2xl"
              style={{
                width: '70px',
                height: '50px',
                left: '160px',
                top: '-55px',
                transform: 'translateZ(1px)',
              }}
            />

            {/* Headlights */}
            <div 
              className="absolute bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/50"
              style={{
                width: '20px',
                height: '20px',
                left: '20px',
                top: '40px',
                transform: 'translateZ(1px)',
              }}
            />
            <div 
              className="absolute bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/50"
              style={{
                width: '20px',
                height: '20px',
                left: '20px',
                top: '70px',
                transform: 'translateZ(1px)',
              }}
            />

            {/* Taillights */}
            <div 
              className="absolute bg-red-500 rounded-full"
              style={{
                width: '15px',
                height: '15px',
                right: '10px',
                top: '40px',
                transform: 'translateZ(1px)',
              }}
            />
            <div 
              className="absolute bg-red-500 rounded-full"
              style={{
                width: '15px',
                height: '15px',
                right: '10px',
                top: '70px',
                transform: 'translateZ(1px)',
              }}
            />

            {/* Wheels Container */}
            <div style={{ transformStyle: 'preserve-3d' }}>
              {/* Front Wheel */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute"
                style={{
                  left: '50px',
                  top: '90px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className="bg-gray-800 rounded-full border-8 border-gray-600"
                  style={{
                    width: '60px',
                    height: '60px',
                    transform: 'translateZ(10px)',
                  }}
                />
                <div 
                  className="absolute bg-gray-700 rounded-full"
                  style={{
                    width: '30px',
                    height: '30px',
                    left: '15px',
                    top: '15px',
                    transform: 'translateZ(15px)',
                  }}
                />
              </motion.div>

              {/* Back Wheel */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute"
                style={{
                  right: '50px',
                  top: '90px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className="bg-gray-800 rounded-full border-8 border-gray-600"
                  style={{
                    width: '60px',
                    height: '60px',
                    transform: 'translateZ(10px)',
                  }}
                />
                <div 
                  className="absolute bg-gray-700 rounded-full"
                  style={{
                    width: '30px',
                    height: '30px',
                    left: '15px',
                    top: '15px',
                    transform: 'translateZ(15px)',
                  }}
                />
              </motion.div>

              {/* Front Wheel - Side View */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute"
                style={{
                  left: '50px',
                  top: '90px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className="bg-gray-800 rounded-full border-8 border-gray-600"
                  style={{
                    width: '60px',
                    height: '60px',
                    transform: 'translateZ(-90px)',
                  }}
                />
                <div 
                  className="absolute bg-gray-700 rounded-full"
                  style={{
                    width: '30px',
                    height: '30px',
                    left: '15px',
                    top: '15px',
                    transform: 'translateZ(-85px)',
                  }}
                />
              </motion.div>

              {/* Back Wheel - Side View */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute"
                style={{
                  right: '50px',
                  top: '90px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className="bg-gray-800 rounded-full border-8 border-gray-600"
                  style={{
                    width: '60px',
                    height: '60px',
                    transform: 'translateZ(-90px)',
                  }}
                />
                <div 
                  className="absolute bg-gray-700 rounded-full"
                  style={{
                    width: '30px',
                    height: '30px',
                    left: '15px',
                    top: '15px',
                    transform: 'translateZ(-85px)',
                  }}
                />
              </motion.div>
            </div>

            {/* Spoiler */}
            <div 
              className="absolute bg-gray-800 rounded-sm"
              style={{
                width: '100px',
                height: '10px',
                right: '20px',
                top: '-70px',
                transform: 'translateZ(0px)',
              }}
            />
            <div 
              className="absolute bg-gray-700"
              style={{
                width: '5px',
                height: '15px',
                right: '30px',
                top: '-70px',
                transform: 'translateZ(0px)',
              }}
            />
            <div 
              className="absolute bg-gray-700"
              style={{
                width: '5px',
                height: '15px',
                right: '100px',
                top: '-70px',
                transform: 'translateZ(0px)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
