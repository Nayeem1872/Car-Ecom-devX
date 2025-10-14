"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Car,
  DollarSign,
  Award,
  Users,
  ThumbsUp,
  ChevronRight,
  Clock,
  Shield,
  CreditCard,
} from "lucide-react";

import useFetchData from "@/hooks/useFetchData";

export default function AboutPage() {
  const { data: userInfo, isLoading } = useFetchData<{ vendors: any[] }>(
    "/api/ecom/vendor/get"
  );
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <main className="min-h-screen relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 opacity-5"
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Car className="h-64 w-64 text-primary" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-10 opacity-5"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <DollarSign className="h-64 w-64 text-primary" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-1/4 opacity-5"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <CreditCard className="h-48 w-48 text-primary" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Driving <span className="text-primary">Dreams</span> Forward
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At ESAUTO, we believe everyone deserves the opportunity to drive a
              quality vehicle. Our mission is to provide affordable cars to
              newcomers and make car ownership accessible through flexible
              financing options.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/cars">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 mr-4"
                >
                  Browse Our Cars
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/financing">
                <Button size="lg" variant="outline">
                  Get Finance
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,69.3C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get Approved and Get Behind the Wheel
              </h2>
              <p className="text-muted-foreground mb-6">
                If you have ever been turned down for an auto loan in the past,
                you know how frustrating it can be. Our expert team at ES Auto
                knows that bad things can happen to good people. By working with
                the best lenders across Canada, we can get you approved and on
                the path to rebuilding your credit. Our knowledgeable and
                friendly staff will walk you through the entire process,
                judgment-free to get you driving.
              </p>
              <p className="text-muted-foreground mb-6">
                We Finance All Types Bad Credit Car Loans
                <br />
                <br />
                We Finance All Types Bad Credit Car Loans. Whether you have good
                credit, bad credit, no credit, bankruptcy, ODSP, are in a
                consumer proposal or if you’re seeking private sale financing,
                simply fill out the quick and easy secure credit application and
                one of our Financial Experts will take care of the rest. But
                don’t take our word for it, see what some of our loyal customers
                have to say. When you apply online, you can rest assured that
                you are dealing directly with the ES Auto, no third party
                involvement.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop"
                  alt="Car Dealership"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Award Winning</h3>
                    <p className="text-sm text-muted-foreground">
                      Best Dealership 2023
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We <span className="text-primary">Offer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive approach ensures that you not only find the
              perfect car but also get the support you need throughout your
              ownership journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Types of Bad Credit Car Loans
              </h3>
              <p className="text-muted-foreground mb-6">
                Having bad credit or a low credit score can be influenced by
                different factors. You may have bad credit and not even know it
                until you apply for a car loan. Most lenders approve or deny
                your car loan application solely based on your credit score.
                What separates us from other car loan providers, and the reason
                why we have a nearly 100% approval rate, is that we tailor bad
                credit based on your specific situation.
              </p>
              <ul className="space-y-3">
                <li className="text-muted-foreground">
                  <span className="font-bold">Self Employed Car Loans:</span>{" "}
                  Most lenders look at the self-employed as bad credit risks
                  because of the instability of their income. The amount of
                  paperwork that is involved for the self-employed to obtain a
                  car loan through traditional lenders is absurd. We are able to
                  cut through a lot of the red tape and get you approved
                  immediately so you can continue to run your business. We get
                  nearly 100% of the self-employed approved.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold">Bankruptcy Car Loans:</span>{" "}
                  Having a bankruptcy on your credit report will have you
                  automatically labelled as a bad credit car loan risk by most
                  lenders. However, we understand that bankruptcy is often a new
                  beginning and a car loan can be the first step in rebuilding
                  bad credit.
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/ourprocess">
                  <Button className="bg-primary hover:bg-primary/90">
                    View Our Process
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Additional Car Loan Options
              </h3>
              <ul className="space-y-3">
                <li className="text-muted-foreground">
                  <span className="font-bold">
                    First Time or Student Car Loans:
                  </span>{" "}
                  One of the best ways to establish credit is by making years of
                  consistent payments towards a car loan. The problem with most
                  first time buyers or students is that they usually have no
                  credit history and are automatically deemed to have bad credit
                  by most lenders. We specialize in first-time and student car
                  loans and have a nearly 100% approval rate because we look at
                  the big picture, not just your credit score. As long as you
                  make your payments as agreed, ES Auto reviews first-time car
                  loans in the tenth month and can rewrite the loan at a lower
                  rate.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold">
                    Subprime or Bad Credit Car Loans:
                  </span>{" "}
                  Subprime means that interest rates are higher than the prime
                  rate, as the risk factor is higher. Someone carrying too much
                  debt is often why car loans are declined by traditional
                  lenders. They view lingering debt, delinquent payments and a
                  low credit score as bad credit. ES Auto believes that everyone
                  deserves a second chance and views subprime car loans as a
                  great way to repair and rebuild bad credit. Most of the loans
                  ES Auto makes are subprime loans, which have a nearly 100%
                  approval rate.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold">No Credit Car Loans:</span> Always
                  paying in cash, never using a credit card and not carrying any
                  debts may seem like a good idea but in reality, no credit
                  history is considered by most lenders as being equivalent to
                  bad credit. This is not the case with ES Auto. At ES Auto, we
                  look at no credit car loans as an opportunity for a customer
                  to build their credit. Not only does ES Auto have a nearly
                  100% approval rate for individuals with no credit history,
                  credit rebuilding is just one of the benefits of teaming up
                  with us.
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/financing">
                  <Button className="bg-primary hover:bg-primary/90">
                    Apply for Financing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Private Car Sales Overview
              </h3>
              <p className="text-muted-foreground mb-6">
                Whether you are a buyer or a seller, ES Auto offers private sale
                financing across Canada.
              </p>
              <p className="text-muted-foreground mb-6">
                <strong>Seller:</strong> As a Seller, being able to offer
                financing on your vehicle will dramatically increase the
                interest in your listing. Potential buyers who would otherwise
                be forced to purchase from Registered Dealerships for financing
                can now buy your private sale and get financed through ES Auto.
                For more information on how you can offer financing on your used
                vehicle listing at no cost to you, feel free to contact us on
                our email and number provided.
              </p>
              <p className="text-muted-foreground mb-6">
                <strong>Buyer:</strong> As a buyer, a private sale is a great
                way to purchase a used vehicle. But unless you have a pocket
                full of cash or an exceptional credit score, most people who are
                in the market for a used car are forced to finance through a
                dealer. With ES Auto, financing a private car sale is now
                possible and can save you hundreds, if not thousands of dollars!
              </p>
              <ul className="list-disc list-inside mb-6 text-muted-foreground">
                <li>Financing</li>
                <li>Licensing</li>
                <li>Safety and E-Testing</li>
              </ul>
              <div className="mt-8">
                <Link href="/about">
                  <Button className="bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Time-Sensitive Private Sales
              </h3>
              <p className="text-muted-foreground mb-6">
                The decision to buy a car is not one that is made lightly and
                people often find out the hard way that by the time they can
                arrange financing, the deal is gone. So before you start your
                search, get pre-approved through ES Auto. By getting
                pre-approved before you start shopping, you’ll know exactly what
                your price range is and when you find the car you want that fits
                into your budget, you can make an offer and close the deal the
                same day.
              </p>
              <p className="text-muted-foreground mb-6">
                Once you are pre-approved, an ES Auto Professional will walk you
                through the simple process and even provide advice on which
                makes and models will best fit your needs and your budget.
              </p>
              <p className="text-muted-foreground">
                <strong>How to Get Pre-approved with ESAUTO:</strong> Our same
                day approval process for private car sales is simple, fast and
                secure. We approve nearly 100% of credit applicants and
                specialize in approving customers with bad or slow credit
                histories.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bankruptcy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bankruptcy</h2>
            <p className="text-muted-foreground mb-6">
              “Financial Freedom” is a concept that very few Canadians have been
              able to declare with confidence, but “Bankruptcy” is a term many
              of them know all too well. Bills keep on filling up the mailbox,
              collection agency calls increase and the items that you require
              for everyday living are no longer affordable. Over the past
              decade, thousands of Canadians have chosen to file for bankruptcy
              in hopes to decrease their required debt payments. In 2013, 22,731
              Ontario residents filed for bankruptcy according to the Office of
              the Superintendent of Bankruptcy Canada. Unfortunately, along with
              completing the bankruptcy process and making monthly payments,
              many people believe that due to their unstable financial history,
              they are no longer qualified to own a car. Thankfully this is not
              the case. ES Auto is giving Canadians the ability to own a car
              without worry.
            </p>
            <p className="text-muted-foreground mb-6">
              Bankruptcy is a process that can affect your future purchases and
              a company’s trust in you, whether it is purchasing a home, renting
              an apartment or applying for a car loan. Bankruptcy is a process
              that no one wants to go through, but it can allow you to eliminate
              some of the debts that you are just unable to pay. Filing for
              bankruptcy involves meeting with a trustee who will assess your
              financial situation, assigning all assets to your trustee, and
              speaking with the Office of the Superintendent of Bankruptcy
              Canada. What many do not realize is that the process does not have
              to end there! By working with a ES Auto Professional, you will be
              working together to find a car that fits all of your needs in an
              easy and timely manner. Meeting with a ES Auto Professional is the
              perfect starting point to begin the exciting process of buying a
              vehicle and rebuilding your credit! Don’t let your financial
              situation hold you back from the freedom and ease of mind that a
              car can give you.
            </p>
            <ul className="list-disc list-inside mb-6 text-muted-foreground">
              <li>Ensure that your credit report is in order</li>
              <li>
                Determine a monthly payment plan that you know you can afford
              </li>
              <li>
                Speak with lenders on your behalf that specialize in bankruptcy
                car loans to get you the best rate possible
              </li>
            </ul>
            <p className="text-muted-foreground">
              Bankruptcy is a part of life that many people have learned to
              embrace, but it does not mean that you have to settle for public
              transit. ES Auto is an excellent resource that can show you how to
              proceed if you have filed for bankruptcy and are hoping to own a
              car. Furthermore, ES Auto has several programs that are in place
              to help you rebuild your credit and regain confidence in your
              financial situation. Bankruptcy does not last for your entire
              life, so don’t let it affect your future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bad Credit Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bad Credit</h2>
            <p className="text-muted-foreground mb-6">
              Over the past several years, Canada’s economy has fluctuated up
              and down, creating a strain on the wallets of Canadians across the
              country. Rising gas prices, insurance rates, food prices and
              electricity and water bills have left people living from paycheque
              to paycheque, providing very little wiggle room when unexpected
              expenses occur. Credit cards have become relied upon as the
              default form of payment for everyday items. Now many Canadians are
              left wondering how they are going to afford to drive a car, let
              alone pay for it.
            </p>
            <p className="text-muted-foreground mb-6">
              “Bad credit” has become a term all too familiar to Canadians, and
              with the transforming financial landscape of the country, people’s
              ability to receive a car loan with a history of bad credit has
              changed completely. The great news is that even if you have a bad
              credit rating, buying a car with the help of ES Auto is still an
              option that you can take advantage of. The process does not have
              to be scary or overwhelming, it can be painless and easy. ES Auto
              aims for you to be able to receive a car that best fits your
              lifestyle and have the freedom that four wheels on an open road
              can give you.
            </p>
            <p className="text-muted-foreground mb-6">
              If you are considering applying for a bad credit car loan with ES
              Auto Financing, be prepared to answer the following questions:
            </p>
            <ul className="list-disc list-inside mb-6 text-muted-foreground">
              <li>What is your total income each month?</li>
              <li>How long have you been employed at your current job?</li>
              <li>How long have you resided at your current address?</li>
              <li>If required, is there someone who can act as a cosigner?</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Due to the stigma around bad credit ratings and car loans, many
              people believe that the process of obtaining a car loan with bad
              credit is long and intimidating. It is actually simple, fast and
              secure as ES Auto allows you to fill out a car loan application
              online from the comfort of your own home.
            </p>
            <p className="text-muted-foreground mb-6">
              Once your application is received, an ES Auto Professional will
              work with you every step of the way until you are behind the wheel
              of your new car. Utilizing their large network of lenders who
              specialize in bad credit car loans coupled with their years of
              expertise is why ES Auto has a nearly 100% approval rate for bad
              credit car loans.
            </p>
            <p className="text-muted-foreground">
              At ES Auto, we believe that everyone deserves to drive and bad
              credit shouldn’t hold you back.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">ESAUTO</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a car dealership. We're your partners in
              making car ownership a reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Service</h3>
              <p className="text-muted-foreground">
                We take the time to understand your unique needs and
                circumstances to provide tailored solutions that work for you.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency & Trust</h3>
              <p className="text-muted-foreground">
                We believe in complete transparency throughout the buying
                process, with no hidden fees or surprises.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Efficient Process</h3>
              <p className="text-muted-foreground">
                Our streamlined process means you can complete your purchase
                quickly and be driving your new car in no time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Customer <span className="text-primary">Stories</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Hear from some of our satisfied
              customers who found their perfect car with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Customer"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">New to Canada</p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "As a newcomer to Canada, I was worried about getting approved
                for a car loan. ESAUTO made the process so easy and found me a
                beautiful car that fit my budget. Their team was incredibly
                supportive throughout the entire process."
              </p>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Customer"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">
                    First-time buyer
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "I was nervous about buying my first car, especially with
                limited credit history. The team at ESAUTO was patient,
                explained everything clearly, and helped me find a reliable car
                with payments I could afford. I couldn't be happier!"
              </p>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Customer"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold">Emily Rodriguez</h3>
                  <p className="text-sm text-muted-foreground">
                    Needed financing
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "After being turned down by traditional lenders, I thought I'd
                never be able to get a decent car. ESAUTO worked with my
                situation and found me both a great car and financing that
                worked with my budget. Their customer service is exceptional!"
              </p>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold mb-2">5000+</h3>
              <p className="text-white/80">Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p className="text-white/80">Cars Sold</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-white/80">Customer Satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-4xl font-bold mb-2">10+</h3>
              <p className="text-white/80">Years of Experience</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your{" "}
              <span className="text-primary">Perfect Car?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Visit our showroom today or browse our inventory online. Our team
              is ready to help you find the perfect vehicle and financing
              solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/cars">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                >
                  Browse Our Cars
                </Button>
              </Link>
              <Link href="/financing">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Get Finance
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
