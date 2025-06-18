
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KnowledgeSystem {
  name: string;
  description: string;
  color: string;
}

interface KnowledgeSystemsGridProps {
  knowledgeSystems: KnowledgeSystem[];
}

const KnowledgeSystemsGrid = ({ knowledgeSystems }: KnowledgeSystemsGridProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Different Knowledge & Pathetic Systems</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {knowledgeSystems.map((system) => (
          <Card key={system.name} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Badge className={`${system.color} mb-2`}>
                {system.name}
              </Badge>
              <p className="text-xs text-gray-600">{system.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeSystemsGrid;
