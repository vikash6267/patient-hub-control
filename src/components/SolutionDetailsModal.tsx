
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Package, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Solution {
  product: string;
  effectiveness: string;
  description: string;
  dosage: string;
  price: number;
}

interface SolutionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: Solution | null;
  problemTitle: string;
}

const SolutionDetailsModal = ({ isOpen, onClose, solution, problemTitle }: SolutionDetailsModalProps) => {
  if (!solution) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-700">{solution.product}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Natural solution for {problemTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Effectiveness Badge */}
          <div className="flex items-center space-x-3">
            <Badge 
              variant={solution.effectiveness === "High" ? "default" : "secondary"}
              className={solution.effectiveness === "High" ? "bg-green-600 text-white text-lg px-4 py-2" : "bg-yellow-100 text-yellow-800 text-lg px-4 py-2"}
            >
              {solution.effectiveness} Effectiveness
            </Badge>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < (solution.effectiveness === "High" ? 5 : 3) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              About This Product
            </h3>
            <p className="text-green-700">{solution.description}</p>
          </div>

          {/* Dosage Information */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recommended Dosage
            </h3>
            <p className="text-blue-700">{solution.dosage}</p>
          </div>

          {/* Safety Information */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Important Information
            </h3>
            <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
              <li>Consult with your healthcare provider before starting any new supplement</li>
              <li>Individual results may vary based on health conditions</li>
              <li>Follow recommended dosage instructions carefully</li>
              <li>Discontinue use if you experience any adverse reactions</li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Key Benefits</h3>
            <ul className="text-purple-700 space-y-1 list-disc list-inside">
              <li>Natural and organic ingredients</li>
              <li>Scientifically researched formulation</li>
              <li>No artificial additives or preservatives</li>
              <li>Third-party tested for purity and potency</li>
            </ul>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-3xl font-bold text-green-600">${solution.price}</span>
              <span className="text-gray-500 ml-2">per bottle</span>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Link to="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDetailsModal;
